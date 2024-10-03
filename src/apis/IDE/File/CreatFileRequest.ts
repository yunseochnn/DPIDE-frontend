import apiClient from '../../apiClient';

const CreatFileRequest = async (
  projectId: number,
  name: string,
  extension: string,
  path: string,
  parentId: number,
  Authorization: string,
) => {
  try {
    const result = await apiClient.post(
      `/projects/${projectId}/files`,
      {
        name: name,
        extension: extension,
        path: path,
        parentId: parentId,
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

export default CreatFileRequest;
