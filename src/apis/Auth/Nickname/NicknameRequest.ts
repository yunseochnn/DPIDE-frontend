import apiClient from '../../apiClient';

const NicknameRequest = async (nickname: string, Authorization: string) => {
  try {
    const result = await apiClient.put(
      '/user/nickname',
      {
        nickname: nickname,
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

export default NicknameRequest;
