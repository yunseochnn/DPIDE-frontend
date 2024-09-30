import apiClient from '../../apiClient';

const LoginRequest = async (email: string, password: string) => {
  const result = await apiClient
    .post('/user/login', {
      email: email,
      password: password,
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      error.response.data;
    });
};

export default LoginRequest;
