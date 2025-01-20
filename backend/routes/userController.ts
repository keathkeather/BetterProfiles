import { Router, Request, Response } from 'express';
import UserService from '../services/userService';
import { userDTO } from '../DTO/userDto';
import { Error } from 'sequelize';

const router: Router = Router();

const createUser = async (
  req: Request<{}, any, userDTO>,
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

const getUser = async (req: Request, res: Response) => {
  try {
    const { id: _USER_ID } = req.params;

    if (!_USER_ID) {
      res.status(400).json({ message: 'USER ID is required' });
      return;
    }

    const user = await UserService.get_User_By_Id(_USER_ID);

    if (!user) {
      res.status(404).json({ message: 'USER not found' });
      return;
    }

    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id: _USER_ID } = req.params;

    if (!_USER_ID) {
      res.status(400).json({ message: 'USER ID is required' });
      return;
    }

    await UserService.delete_user_by_id(_USER_ID);
    res.status(200).send();
    return;
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const getUserDetails = async (req: Request, res: Response) => {
  try {
    const { id: _USER_ID } = req.params;

    if (!_USER_ID) {
      res.status(400).json({ message: 'USER ID is required' });
      return;
    }
    const user = await UserService.get_user_with_details(_USER_ID);

    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Use the typed handler
router.post('/create', createUser);
router.get('/getUser/:id', getUser);
router.delete('/deleteUser/:id', deleteUser);
router.get('/getUserDetails/:id', getUserDetails);
export default router;
