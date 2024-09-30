import { useCookies } from 'react-cookie';
import apiClient from '../../apiClient';

const SignUpRequest = async (email: string, password: string) => {
  const result = await apiClient
    .post('/user/login', {
      email: email,
      password: password,
    })

    .then(response => {
      console.log(response);

      return response;
    })
    .catch(error => {
      return error.response;
    });
  return result;
};

export default SignUpRequest;
