const express = require('express');
const router = express.Router();
const submissionController = require('../controllers/submissionController');
const { authenticate } = require('../services/authService');

// POST /api/submissions/upload
router.post('/upload', submissionController.uploadFile);
// POST /api/submissions/metadata
router.post('/metadata', submissionController.submitMetadata);
// GET /api/submissions/review/:id
router.get('/review/:id', submissionController.reviewSubmission);
// POST /api/submissions/publish/:id
router.post('/publish/:id', submissionController.publishSubmission);

// POST /api/submissions/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Missing credentials' });
  try {
    const user = await authenticate(username, password);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    res.json({ username: user.username, role: user.role });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;