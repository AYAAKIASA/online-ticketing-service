import React from 'react';
import { useHistory } from 'react-router-dom';

const LogoutButton: React.FC = () => {
  const history = useHistory();

  const logout = async () => {
    try {
      const response = await fetch('http://localhost:3000/auth/logout', {
        method: 'POST',
        credentials: 'include', // 쿠키를 사용하는 경우 필요
      });

      if (response.ok) {
        localStorage.removeItem('access_token'); // 로컬 스토리지에서 토큰 삭제
        history.push('/login'); // 로그아웃 후 로그인 페이지로 리디렉션
      } else {
        console.error('Failed to log out');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <button onClick={logout}>Logout</button>
  );
};

export default LogoutButton;
