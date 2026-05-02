const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const requireAuth = require('../middleware/auth');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

// GET /api/posts?sort=top-week|recent|most-liked&group=<id>
router.get('/', async (req, res) => {
  const { sort = 'top-week', group } = req.query;
  const filter = {};
  if (group) filter.group = group;

  try {
    let query = Post.find(filter).populate('author', 'email').populate('group', 'name');

    if (sort === 'recent') {
      query = query.sort({ createdAt: -1 });
    } else if (sort === 'most-liked') {
      query = query.sort({ likes: -1, createdAt: -1 });
    } else {
      // top-week: posts from the last 7 days sorted by likes
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      filter.createdAt = { $gte: weekAgo };
      query = Post.find(filter).populate('author', 'email').populate('group', 'name')
        .sort({ likes: -1, createdAt: -1 });
    }

    const posts = await query.limit(50).lean();
    res.json(posts.map(p => ({ ...p, likeCount: p.likes.length })));
  } catch {
    res.status(500).json({ error: 'Failed to fetch posts.' });
  }
});

// POST /api/posts
router.post('/', requireAuth, [
  body('title').trim().notEmpty().withMessage('Title is required').isLength({ max: 300 }),
  body('body').optional().isLength({ max: 40000 }),
  body('group').optional().isMongoId()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const post = await Post.create({
      title: req.body.title,
      body: req.body.body || '',
      author: req.user.id,
      group: req.body.group || null
    });
    await post.populate('author', 'email');
    res.status(201).json(post);
  } catch {
    res.status(500).json({ error: 'Failed to create post.' });
  }
});

// POST /api/posts/:id/like
router.post('/:id/like', requireAuth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found.' });

    const idx = post.likes.indexOf(req.user.id);
    if (idx === -1) {
      post.likes.push(req.user.id);
    } else {
      post.likes.splice(idx, 1);
    }
    await post.save();
    res.json({ likeCount: post.likes.length, liked: idx === -1 });
  } catch {
    res.status(500).json({ error: 'Failed to update like.' });
  }
});

// GET /api/posts/:id/comments
router.get('/:id/comments', async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.id })
      .populate('author', 'email')
      .sort({ createdAt: 1 })
      .lean();
    res.json(comments);
  } catch {
    res.status(500).json({ error: 'Failed to fetch comments.' });
  }
});

// POST /api/posts/:id/comments
router.post('/:id/comments', requireAuth, [
  body('body').trim().notEmpty().withMessage('Comment body is required').isLength({ max: 10000 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found.' });

    const comment = await Comment.create({
      body: req.body.body,
      author: req.user.id,
      post: req.params.id
    });
    post.commentCount += 1;
    await post.save();
    await comment.populate('author', 'email');
    res.status(201).json(comment);
  } catch {
    res.status(500).json({ error: 'Failed to post comment.' });
  }
});

module.exports = router;
