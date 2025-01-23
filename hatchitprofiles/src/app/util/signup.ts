import axios from 'axios';
import { SignupData } from '../types/types';


export async function sign_up(data: SignupData): Promise<{ success: boolean; message: string; data?: any }> {
    try {
      const response = await axios.post('http://localhost:3000/api/create', data);
      console.log('Signup successful:', response.data);
      return { success: true, message: 'Signup successful', data: response.data };
    } catch (error) {
      console.error('Error during signup:', error);
      return { success: false, message: 'Error during signup', data: error };
    }
  }


