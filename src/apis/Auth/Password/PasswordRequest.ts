import apiClient from '../../apiClient';

const PasswordRequest = async (oldPassword: string, newPassword: string, Authorization: string) => {
  try {
    const result = await apiClient.put(
      '/user/password',
      {
        oldPassword: oldPassword,
        newPassword: newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${Authorization}`,
        },
      },
    );
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default PasswordRequest;
