import { Router, Request, Response } from 'express';
import UserService from '../services/userService';
import { CreateUserDto } from '../DTO/userDto';

const router: Router = Router();

const createUser = async (
  req: Request<{}, any, CreateUserDto>,
  res: Response
): Promise<void> => {
  const { _USERNAME, _EMAIL, _PASSWORD } = req.body;

  try {
    // Validate required fields
    if (!_USERNAME || !_EMAIL || !_PASSWORD) {
      res.status(400).json({ message: 'All fields are required.' });
      return;
    }

    // Call the service to create a user
    const newUser = await UserService.create_user({
      _USERNAME,
      _EMAIL,
      _PASSWORD,
    });

    // Send the response after the user is created
    res.status(201).json(newUser);
  } catch (error: any) {
    // Handle errors and send response
    res.status(500).json({ message: error.message });
  }
};

// Use the typed handler
router.post('/create', createUser);

export default router;
