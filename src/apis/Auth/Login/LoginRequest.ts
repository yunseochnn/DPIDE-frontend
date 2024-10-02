import apiClient from '../../apiClient';

const LoginRequest = async (email: string, password: string) => {
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
      console.log(error);
      return error.response;
    });
  return result;
};

export default LoginRequest;
