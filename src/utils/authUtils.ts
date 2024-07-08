import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'; // bcrypt 모듈 추가
import User, { IUser } from '../models/User';

export async function hashPassword(password: string): Promise<string> {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
}

export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
}

export function generateToken(user: IUser): string {
  const token = jwt.sign({ _id: user._id }, 'your_secret_key', { expiresIn: '1h' });
  return token;
}

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: '인증 토큰이 없습니다.' });
  }

  try {
    const decoded: any = jwt.verify(token, 'your_secret_key');
    const user: IUser | null = await User.findById(decoded._id);

    if (!user) {
      return res.status(401).json({ error: '유효하지 않은 인증 토큰입니다.' });
    }

    req.user = user; // req.user에 IUser 타입의 user를 설정
    next(); // 다음 미들웨어로 제어를 넘김
  } catch (err) {
    res.status(401).json({ error: '유효하지 않은 인증 토큰입니다.' });
  }
}
