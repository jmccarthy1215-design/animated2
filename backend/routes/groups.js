const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const requireAuth = require('../middleware/auth');
const Group = require('../models/Group');

// GET /api/groups
router.get('/', async (_req, res) => {
  try {
    const groups = await Group.find()
      .populate('owner', 'email')
      .select('name description owner members limit createdAt')
      .sort({ createdAt: -1 })
      .lean();
    res.json(groups.map(g => ({ ...g, memberCount: g.members.length })));
  } catch {
    res.status(500).json({ error: 'Failed to fetch groups.' });
  }
});

// POST /api/groups
router.post('/', requireAuth, [
  body('name').trim().notEmpty().withMessage('Group name is required').isLength({ max: 100 }),
  body('description').optional().isLength({ max: 500 }),
  body('limit').optional().isInt({ min: 2 }).withMessage('Limit must be at least 2')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const group = await Group.create({
      name: req.body.name,
      description: req.body.description || '',
      owner: req.user.id,
      members: [req.user.id],
      limit: req.body.limit || null
    });
    await group.populate('owner', 'email');
    res.status(201).json(group);
  } catch {
    res.status(500).json({ error: 'Failed to create group.' });
  }
});

// POST /api/groups/:id/join
router.post('/:id/join', requireAuth, async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) return res.status(404).json({ error: 'Group not found.' });

    if (group.members.includes(req.user.id)) {
      return res.status(400).json({ error: 'Already a member.' });
    }
    if (group.limit && group.members.length >= group.limit) {
      return res.status(400).json({ error: 'Group is full.' });
    }

    group.members.push(req.user.id);
    await group.save();
    res.json({ memberCount: group.members.length });
  } catch {
    res.status(500).json({ error: 'Failed to join group.' });
  }
});

// DELETE /api/groups/:id/leave
router.delete('/:id/leave', requireAuth, async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) return res.status(404).json({ error: 'Group not found.' });
    if (group.owner.toString() === req.user.id) {
      return res.status(400).json({ error: 'Owner cannot leave. Transfer ownership or delete the group.' });
    }

    group.members = group.members.filter(m => m.toString() !== req.user.id);
    await group.save();
    res.json({ memberCount: group.members.length });
  } catch {
    res.status(500).json({ error: 'Failed to leave group.' });
  }
});

// DELETE /api/groups/:id/members/:userId  (owner only)
router.delete('/:id/members/:userId', requireAuth, async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) return res.status(404).json({ error: 'Group not found.' });
    if (group.owner.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Only the group owner can remove members.' });
    }

    group.members = group.members.filter(m => m.toString() !== req.params.userId);
    await group.save();
    res.json({ memberCount: group.members.length });
  } catch {
    res.status(500).json({ error: 'Failed to remove member.' });
  }
});

module.exports = router;
