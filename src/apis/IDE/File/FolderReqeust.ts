import apiClient from '../../apiClient';

const FolderRequest = async (projectId: number, Authorization: string) => {
  try {
    const result = await apiClient.get(`/projects/${projectId}`, {
      headers: {
        Authorization: `Bearer ${Authorization}`,
      },
    });
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);

    throw error;
  }
};

export default FolderRequest;
