import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  id: { type: String, required: true },
  username: { type: String, required: true },
  content: { type: String, required: true, maxlength: 30 },
  avatar: { type: String },
  color: { type: String, required: true },
  speed: { type: Number, required: true, min: 1, max: 10 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Comment', CommentSchema);
