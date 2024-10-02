import axios from 'axios';

const RemoveFileRequest = async (projectId: number, fileId: number, Authorization: string) => {
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  try {
    const result = await axios.delete(`${baseURL}/projects/${projectId}/files/${fileId}`, {
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
