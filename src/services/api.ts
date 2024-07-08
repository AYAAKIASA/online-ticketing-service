import axios, { AxiosInstance } from 'axios'; // AxiosInstance은 필요하지만 AxiosRequestConfig는 명시적으로 import하지 않음

const axiosInstance: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const csrfToken = getCsrfToken();
    if (csrfToken) {
      config.headers['X-CSRF-Token'] = csrfToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const getCsrfToken = (): string | undefined => {
  return 'your_csrf_token_here';
};

export const fetchUserData = async (userId: string): Promise<any> => {
  try {
    const response = await axiosInstance.post('/user', { userId });
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};
