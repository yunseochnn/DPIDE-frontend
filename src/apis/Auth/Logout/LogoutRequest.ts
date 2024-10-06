import apiClient from '../../apiClient';

const LogoutRequest = async (RefreshToken: string, Authorization: string) => {
  try {
    const result = await apiClient.post(
      `/user/logout`,
      {},
      {
        headers: {
          'Refresh-Token': RefreshToken,
          Authorization: `Bearer ${Authorization}`,
        },
      },
    );
    console.log(result);
    return result;
  } catch (error: unknown) {
    console.log(error);
    throw error;
  }
};

export default LogoutRequest;
