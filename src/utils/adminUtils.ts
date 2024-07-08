import User, { IUser } from '../models/User';

async function isAdmin(userId: string): Promise<boolean> {
  try {
    const user: IUser | null = await User.findById(userId);
    if (!user) {
      return false; // 사용자가 존재하지 않으면 false를 반환합니다.
    }
    return user.role === 'ADMIN'; // ADMIN 역할인지 확인하여 true 또는 false를 반환합니다.
  } catch (err) {
    console.error('Error checking admin status:', err);
    return false;
  }
}

export { isAdmin };
