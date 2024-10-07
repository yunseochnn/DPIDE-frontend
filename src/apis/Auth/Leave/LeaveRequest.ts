import apiClient from '../../apiClient';

const LeaveRequest = async (Authorization: string, RefreshToken: string) => {
  try {
    const result = await apiClient.delete('/user', {
      headers: {
        Authorization: `Bearer ${Authorization}`,
        'Refresh-Token': RefreshToken,
      },
    });
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default LeaveRequest;
