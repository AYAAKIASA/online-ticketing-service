import { Request, Response } from 'express';
import User, { IUser } from '../models/User';

export async function getProfile(req: Request, res: Response) {
  // req.user 객체에서 이미 사용자 정보를 추출할 수 있습니다.
  const user = req.user as IUser;

  if (!user) {
    return res.status(401).json({ error: '인증된 사용자가 아닙니다.' });
  }

  try {
    // findById 대신 req.user 객체를 사용하여 사용자 정보를 반환합니다.
    // 이 경우에는 findById로 데이터베이스 쿼리를 수행할 필요가 없습니다.
    res.status(200).json(user);
  } catch (err) {
    console.error('Error fetching user profile:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
