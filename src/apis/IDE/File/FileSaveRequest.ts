const FileSaveRequest = async (projectId: number, fileId: number, content: string, Authorization: string) => {
  try {
    const baseURL = import.meta.env.VITE_API_BASE_URL;
    // 문자열 데이터를 Blob 객체로 변환 (파일처럼 다룸)
    const fileBlob = new Blob([content], { type: 'text/plain' });

    //Blob을 File 객체로 변환
    const file = new File([fileBlob], `${fileId}File`, { type: 'text/plain' });

    //FormData 생성
    const formData = new FormData();
    formData.append('content', file);

    //파일 전송 API 호출
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
