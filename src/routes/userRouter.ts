import express from 'express';
import { getProfile } from '../controllers/userController';
import { authMiddleware } from '../utils/authUtils'; // 수정된 import 구문

const router = express.Router();

router.get('/profile', authMiddleware, getProfile);

export default router;