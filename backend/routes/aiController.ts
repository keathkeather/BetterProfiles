import { Request, Response, Router } from 'express';
import aiService from '../services/aiService';
const router: Router = Router();

  const chat = async(req: Request, res: Response): Promise<void> => {
    const { _USER_ID, _QUESTION } = req.body;

    try {
      const result = await aiService.aiChat(_USER_ID, _QUESTION);

      if (result.message === 'User not found') {
         res.status(404).json({ message: result.message });
      }

      res.status(200).json(result);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

router.post('/aiChat', chat);
export default router;