import { Document, Types } from 'mongoose';

export interface IUser extends Document {
  _id: Types.ObjectId;
  role: string;
  username: string;
  email: string;
  password: string;
  points: number;
  // 필요한 경우 다른 속성 추가
}