require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const groupRoutes = require('./routes/groups');
const messageRoutes = require('./routes/messages');

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/messages', messageRoutes);

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    const port = process.env.PORT || 3001;
    app.listen(port, () => console.log(`Gannon Forum API running on port ${port}`));
  })
  .catch(err => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  });
