const FileSaveRequest = async (projectId: number, fileId: number, content: string, Authorization: string) => {
  try {
    const baseURL = import.meta.env.VITE_API_BASE_URL;

    const fileBlob = new Blob([content], { type: 'text/plain' });

    const file = new File([fileBlob], `${fileId}File`, { type: 'text/plain' });

    const formData = new FormData();
    formData.append('content', file);

    const response = await fetch(`${baseURL}/projects/${projectId}/files/${fileId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${Authorization}`,
      },
      body: formData,
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default FileSaveRequest;
