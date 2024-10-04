import apiClient from '../../apiClient';

const FriendRequest = async (projectId: number, email: string, Authorization: string) => {
  try {
    const result = await apiClient.post(
      `/projects/${projectId}/invite`,
      {
        email: email,
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

export default FriendRequest;
