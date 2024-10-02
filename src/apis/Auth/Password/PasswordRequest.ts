import apiClient from '../../apiClient';

const PasswordRequest = async (oldPassword: string, newPasword: string, Authorization: string) => {
  try {
    const result = await apiClient.put(
      '/user',
      {
        oldPassword: oldPassword,
        newPasword: newPasword,
      },
      {
        headers: {
          Authorization: `Bearer ${Authorization}`,
        },
      },
    );
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default PasswordRequest;
