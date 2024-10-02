import apiClient from '../../apiClient';

const LeaveRequest = async (Authorization: string) => {
  try {
    const result = await apiClient.delete('/user', {
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

export default LeaveRequest;
