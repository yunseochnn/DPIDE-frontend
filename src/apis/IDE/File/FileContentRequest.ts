import axios from 'axios';

const FileContentRequest = async (projectId: number, fileId: number, Authorization: string) => {
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  try {
    const result = await axios.get(`${baseURL}/projects/${projectId}/files/${fileId}`, {
      headers: {
        Authorization: `Bearer ${Authorization}`,
      },
      responseType: 'blob', //바이너리 데이터로 받기
    });
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default FileContentRequest;
