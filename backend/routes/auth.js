const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { body, validationResult } = require('express-validator');
const { Resend } = require('resend');
const User = require('../models/User');

const resend = new Resend(process.env.RESEND_API_KEY);
const DOMAIN = process.env.EMAIL_DOMAIN_WHITELIST || 'gannon.edu';

function issueToken(user) {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
}

router.post('/register', [
  body('email').isEmail().withMessage('Valid email required')
    .custom(v => v.endsWith(`@${DOMAIN}`) || Promise.reject(`Only @${DOMAIN} emails are accepted.`)),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;
  try {
    if (await User.findOne({ email })) {
      return res.status(409).json({ error: 'An account with that email already exists.' });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await User.create({ email, passwordHash, verificationToken, verificationExpires });

    const verifyUrl = `${process.env.FRONTEND_URL}/verify?token=${verificationToken}`;
    await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Verify your Gannon Forum account',
      html: `<p>Click the link below to verify your account. It expires in 24 hours.</p>
             <p><a href="${verifyUrl}">${verifyUrl}</a></p>`
    });

    res.status(201).json({ message: 'Account created. Check your @gannon.edu email to verify.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Registration failed.' });
  }
});

router.get('/verify/:token', async (req, res) => {
  try {
    const user = await User.findOne({
      verificationToken: req.params.token,
      verificationExpires: { $gt: new Date() }
    });
    if (!user) return res.status(400).json({ error: 'Invalid or expired verification link.' });

    user.verified = true;
    user.verificationToken = undefined;
    user.verificationExpires = undefined;
    await user.save();

    res.json({ message: 'Email verified. You can now sign in.' });
  } catch {
    res.status(500).json({ error: 'Verification failed.' });
  }
});

router.post('/login', [
  body('email').isEmail(),
  body('password').notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }
    if (!user.verified) {
      return res.status(403).json({ error: 'Check your email to verify your account first.' });
    }

    res.json({ token: issueToken(user), email: user.email, id: user._id });
  } catch {
    res.status(500).json({ error: 'Login failed.' });
  }
});

module.exports = router;
