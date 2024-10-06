import apiClient from '../../apiClient';

const PlayRequest = async (projectId: number, fileId: number, Authorization: string, userInput: string) => {
  try {
    const result = await apiClient.post(
      `/projects/${projectId}/files/${fileId}`,
      {
        userInput: userInput,
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

export default PlayRequest;
