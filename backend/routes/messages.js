const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const requireAuth = require('../middleware/auth');
const Message = require('../models/Message');
const Group = require('../models/Group');

// GET /api/messages/dm/:userId — conversation between me and :userId
router.get('/dm/:userId', requireAuth, async (req, res) => {
  try {
    const messages = await Message.find({
      group: null,
      $or: [
        { sender: req.user.id, recipient: req.params.userId },
        { sender: req.params.userId, recipient: req.user.id }
      ]
    }).populate('sender', 'email').sort({ createdAt: 1 }).limit(200).lean();
    res.json(messages);
  } catch {
    res.status(500).json({ error: 'Failed to fetch messages.' });
  }
});

// POST /api/messages/dm — send a DM
router.post('/dm', requireAuth, [
  body('recipientId').isMongoId().withMessage('Valid recipient ID required'),
  body('body').trim().notEmpty().withMessage('Message body is required').isLength({ max: 5000 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const msg = await Message.create({
      body: req.body.body,
      sender: req.user.id,
      recipient: req.body.recipientId
    });
    await msg.populate('sender', 'email');
    res.status(201).json(msg);
  } catch {
    res.status(500).json({ error: 'Failed to send message.' });
  }
});

// GET /api/messages/group/:groupId
router.get('/group/:groupId', requireAuth, async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId);
    if (!group) return res.status(404).json({ error: 'Group not found.' });
    if (!group.members.includes(req.user.id)) {
      return res.status(403).json({ error: 'You must be a member to view group messages.' });
    }

    const messages = await Message.find({ group: req.params.groupId })
      .populate('sender', 'email')
      .sort({ createdAt: 1 })
      .limit(200)
      .lean();
    res.json(messages);
  } catch {
    res.status(500).json({ error: 'Failed to fetch group messages.' });
  }
});

// POST /api/messages/group/:groupId
router.post('/group/:groupId', requireAuth, [
  body('body').trim().notEmpty().withMessage('Message body is required').isLength({ max: 5000 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const group = await Group.findById(req.params.groupId);
    if (!group) return res.status(404).json({ error: 'Group not found.' });
    if (!group.members.includes(req.user.id)) {
      return res.status(403).json({ error: 'You must be a member to send messages.' });
    }

    const msg = await Message.create({
      body: req.body.body,
      sender: req.user.id,
      group: req.params.groupId
    });
    await msg.populate('sender', 'email');
    res.status(201).json(msg);
  } catch {
    res.status(500).json({ error: 'Failed to send group message.' });
  }
});

module.exports = router;
