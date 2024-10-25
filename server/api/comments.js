import { Router } from 'express';
const router = Router();
import Comment, { find } from '../models/Comment';

router.get('/', async (req, res) => {
  const comments = await find();
  res.json(comments);
});

router.post('/', async (req, res) => {
  const newComment = new Comment(req.body);
  await newComment.save();
  res.json(newComment);
});

export default router;
