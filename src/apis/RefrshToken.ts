import { CookieSetOptions } from 'universal-cookie';
import apiClient from './apiClient';

interface ICode {
  status: number;
  message: string;
}

const RefreshToken = async (
  refreshToken: string,
  setCookie: (name: string, value: string, options?: CookieSetOptions) => void,
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

    if (result.data.status === 201) {
      const token = result.headers['authorization']?.replace('Bearer ', '');
      if (token) {
        setCookie('Authorization', token, { path: '/', secure: false, sameSite: 'strict' });
        console.log('새로운 토큰 생성');
      }
    }

    if (result.data.status === 401 || result.data.status === 500) {
      alert(result.data.message);
    }
  } catch (error) {
    console.log(error);
  }
};

export default RefreshToken;
