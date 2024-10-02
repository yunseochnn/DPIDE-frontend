import apiClient from '../../apiClient';

const FriendRequest = async (projectId: number, userId: number, email: string, Authorization: string) => {
  try {
    const result = await apiClient.post(
      `/projects/${projectId}/invite`,
      {
        projectId: projectId,
        userId: userId,
        email: email,
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

export default FriendRequest;
