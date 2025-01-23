import axios from 'axios';

interface SearchData {
  _USERNAME: string;
}

export async function searchUserByName(data: SearchData): Promise<{ success: boolean; message: string; data?: any }> {
  try {
    const response = await axios.get(`http://localhost:3000/api/searchUserByName/${data._USERNAME}`);
    console.log('Search successful:', response.data);
    return { success: true, message: 'Search successful', data: response.data };
  } catch (error) {
    console.error('Error during search:', error);
    return { success: false, message: 'Error during search', data: error };
  }
}