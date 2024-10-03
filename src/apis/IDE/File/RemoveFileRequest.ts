import apiClient from '../../apiClient';

const RemoveFileRequest = async (projectId: number, fileId: number, Authorization: string) => {
  try {
    const result = await apiClient.delete(`/projects/${projectId}/files/${fileId}`, {
      headers: {
        Authorization: `Bearer ${Authorization}`,
      },
    });
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default RemoveFileRequest;
