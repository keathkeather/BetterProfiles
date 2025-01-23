import { Router, Request, Response } from 'express';
import AuthService from '../services/authService';
import { loginDTO } from '../DTO/loginDTO';

const router: Router = Router();

const loginUser = async (req: Request<{}, any, loginDTO>, res: Response): Promise<void> => {
    const { _EMAIL, _PASSWORD } = req.body;

    try {
        // Validate required fields
        if (!_EMAIL || !_PASSWORD) {
            res.status(400).json({ message: 'Email and password are required.' });
            return;
        }

        // Call the service to login the user
        const result = await AuthService.login_user({ _EMAIL, _PASSWORD });
       
        
        if (!result || !result.token) {
            res.status(400).json({ message: 'Invalid email or password.' });    
            return;
        }

        // Send the response with the user and token
        res.status(200).json({ token: result.token });
    } catch (error: any) {
        // Handle errors and send response
        res.status(500).json({ message: error.message });
    }
};

// Use the typed handler
router.post('/login', loginUser);

export default router;