import { Router } from 'express';
import multer, { diskStorage } from 'multer';
const router = Router();
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

const storage = diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}${extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

router.post('/', upload.single('avatar'), (req, res) => {
  res.json({ avatarUrl: `/uploads/${req.file.filename}` });
});

export default router;
