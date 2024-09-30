import axios from 'axios';
import { ProjectType } from '../types';

const baseURL = import.meta.env.VITE_API_BASE_URL;

// 내 프로젝트 목록
export const fetchMyProjects = async (userId: string, token: string): Promise<ProjectType[]> => {
  try {
    const response = await axios.get(`${baseURL}/projects/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('My Projects:', response.data);
    return response.data.projects;
  } catch (error) {
    console.error('Error fetching my projects:', error);
    return [];
  }
};

// 공유 받은 프로젝트 목록
export const fetchSharedProjects = async (userId: string, token: string): Promise<ProjectType[]> => {
  try {
    const response = await axios.get(`${baseURL}/projects/${userId}/invited`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('Shared Projects:', response.data);
    return response.data.projects;
  } catch (error) {
    console.error('Error fetching shared projects:', error);
    return [];
  }
};
