import apiClient from '../../apiClient';

const NicknameRequest = async (oldPassword: string, nickname: string, Authorization: string) => {
  try {
    const result = await apiClient.put(
      '/user',
      {
        oldPassword: oldPassword,
        nickname: nickname,
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

export default NicknameRequest;
