import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  role: string;
  username: string;
  email: string;
  password: string;
  points: number;
  verifyPassword(password: string): boolean;
  // 필요한 경우 다른 속성 추가
}

const userSchema: Schema<IUser> = new Schema({
  role: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  points: { type: Number, default: 1000000 },
  // 필요한 경우 다른 필드 추가
});

userSchema.methods.verifyPassword = function (password: string): boolean {
    // 비밀번호 비교 로직 구현
    // 예시로는 단순히 비교만 하지만 실제로는 bcrypt 등을 사용해야 합니다.
    return this.password === password;
  };

export default mongoose.model<IUser>('User', userSchema);
