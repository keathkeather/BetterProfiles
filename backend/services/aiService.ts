import openai, { OpenAI } from "openai";
import UserService from "./userService";

export default class aiService {
  static async aiChat(_USER_ID: string, _QUESTION: string) {
    const openai = new OpenAI({ apiKey: process.env._OPENAI_API_KEY });
    try {
      const userDetails = await UserService.get_user_with_details(_USER_ID);

      if (!userDetails) {
        return { message: 'User not found' };
      }

      // Pass user data and the question to GPT-3.5
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: 'system', content: 'You are an intelligent assistant for retrieving and explaining user details.' },
          { role: 'system', content: 'You should act as if you are the person described in the following user details and answer questions as if you were that person.' },
          { role: 'user', content: `Here is the user data: ${JSON.stringify(userDetails)}.` },
          { role: 'user', content: `The user asked: ${_QUESTION}` },
          { role: 'user', content: 'You should not mention which field is the data from.' },
        ],
        store: true,
      });

      // Extract the reply from the response
      const reply = response.choices[0].message.content;

      return { reply };
    } catch (error: any) {
      console.error(error);
      return { message: 'Internal Server Error' };
    }
  }
}