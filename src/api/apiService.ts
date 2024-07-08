const apiUrl = 'http://api.example.com';

// 토큰 관리 예시: 로컬 스토리지에서 토큰 가져오기
const getToken = (): string | null => {
  return localStorage.getItem('token');
};

// GET 요청
export const fetchData = async (): Promise<any> => {
  try {
    const response = await fetch(`${apiUrl}/data`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
};

// POST 요청
export const postData = async (data: any): Promise<any> => {
  try {
    const response = await fetch(`${apiUrl}/data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    throw new Error('Failed to post data');
  }
};

// 인증이 필요한 GET 요청
export const fetchProtectedData = async (): Promise<any> => {
  const authToken = 'Bearer ' + getToken(); // 토큰 관리 예시: 토큰 가져오기
  try {
    const response = await fetch(`${apiUrl}/protected/resource`, {
      headers: {
        'Authorization': authToken,
      },
    });
    if (!response.ok) {
      if (response.status === 401) {
        await refreshToken(); // 토큰 갱신 시도
        const newAuthToken = 'Bearer ' + getToken(); // 갱신된 토큰 다시 가져오기
        const newResponse = await fetch(`${apiUrl}/protected/resource`, {
          headers: {
            'Authorization': newAuthToken,
          },
        });
        if (!newResponse.ok) {
          throw new Error('Failed to fetch protected data');
        }
        return newResponse.json();
      } else {
        throw new Error('Failed to fetch protected data');
      }
    }
    return response.json();
  } catch (error) {
    throw new Error('Failed to fetch protected data');
  }
};

// 토큰 갱신 요청
const refreshToken = async (): Promise<void> => {
  try {
    const response = await fetch(`${apiUrl}/refresh-token`);
    const data = await response.json();
    const newToken = data.token;
    localStorage.setItem('token', newToken); // 새로운 토큰으로 로컬 스토리지 업데이트
  } catch (error) {
    throw new Error('Failed to refresh token');
  }
};