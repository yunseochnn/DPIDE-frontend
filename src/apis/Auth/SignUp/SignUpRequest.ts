import apiClient from '../../apiClient';

const SignUpRequest = async (email: string, password: string, nickname: string) => {
  const result = await apiClient
    .post('/user/register', {
      email: email,
      password: password,
      nickname: nickname,
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      return error.response.data;
    });
  return result;
};

export default SignUpRequest;
