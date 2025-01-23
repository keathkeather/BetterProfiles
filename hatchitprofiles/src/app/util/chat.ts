import axios from 'axios';

interface ChatRequest {
  _USER_ID: string;
  _QUESTION: string;
}

interface ChatResponse {
  reply: string;
}

export async function aiChat(request: ChatRequest): Promise<ChatResponse> {
  try {
    const response = await axios.post('http://localhost:3000/api/aiChat', request);
    console.log('Received response:', response.data); // Add logging
    return response.data;
  } catch (error) {
    console.error('Error during AI chat:', error);
    throw new Error('Failed to get AI chat response');
  }
}