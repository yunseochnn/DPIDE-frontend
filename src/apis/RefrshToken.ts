import apiClient from './apiClient';
import { CookieSetOptions } from 'universal-cookie';

interface ICode {
  status: number;
  message: string;
}

const RefreshToken = async (
  refreshToken: string,
  setCookie: (name: 'Authorization' | 'Refresh-Token' | 'userId', value: string, options?: CookieSetOptions) => void,
) => {
  try {
    const result = await apiClient.post<ICode>(
      '/api/token',
      {},
      {
        headers: {
          'Refresh-Token': refreshToken,
        },
      },
    );

    if (result.status === 200) {
      const token = result.headers['authorization']?.replace('Bearer ', '');
      if (token) {
        setCookie('Authorization', token, { path: '/', secure: false, sameSite: 'strict' });
        console.log('새로운 토큰 생성');
      }
    }

    if (result.data.status === 400 || result.data.status === 500) {
      alert(result.data.message);
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default RefreshToken;
