const express = require('express');
const router = express.Router();

// Mocked comments data for this example (You'll replace this with a database)
let comments = [];

// POST a new comment
router.post('/comments', (req, res) => {
  const { comment } = req.body;
  if (!comment) {
    return res.status(400).json({ error: 'Comment cannot be empty' });
  }

  comments.push(comment);
  res.status(201).json({ message: 'Comment added successfully' });
});

// GET all comments
router.get('/comments', (req, res) => {
  res.status(200).json(comments);
});

module.exports = router;