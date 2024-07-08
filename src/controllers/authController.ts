import { Request, Response } from 'express';
import User, { IUser } from '../models/User';
import { hashPassword, comparePassword, generateToken } from '../utils/authUtils'; // 수정된 import 구문

export async function signup(req: Request, res: Response) {
  const { username, password } = req.body;

  try {
    const hashedPassword = await hashPassword(password);
    const newUser: IUser = new User({ username, password: hashedPassword });

    await newUser.save();

    res.status(201).json({ message: '회원가입이 성공적으로 완료되었습니다.' });
  } catch (err) {
    console.error('Error signing up:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function login(req: Request, res: Response) {
  const { username, password } = req.body;

  try {
    const user: IUser | null = await User.findOne({ username });

    if (!user || !(await comparePassword(password, user.password))) {
      return res.status(401).json({ error: '유효하지 않은 자격 증명입니다.' });
    }

    const token = generateToken(user);

    res.status(200).json({ token });
  } catch (err) {
    console.error('Error logging in:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}