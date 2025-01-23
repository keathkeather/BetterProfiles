import axios from 'axios';
import Cookies from 'js-cookie';
import { loginData } from '../types/types';

export async function log_in(data: loginData): Promise<{ success: boolean; message: string; data?: any }> {
  try {
    const response = await axios.post('http://localhost:3000/api/login', data);
    Cookies.set('token', response.data.token, { expires: 7, secure: true, sameSite: 'strict' });
    return { success: true, message: 'Login successful', data: response.data.token };
  } catch (error) {
    console.error('Error during login:', error);
    return { success: false, message: 'Error during login', data: error };
  }
}