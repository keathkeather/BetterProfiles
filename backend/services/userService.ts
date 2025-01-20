import { CreateUserDto } from '../DTO/userDto';
const { User } = require('../models'); // Use require for compatibility

export default class UserService {
  static async create_user(data: CreateUserDto) {
    try {
      console.log(User); // Should log the User model
      console.log(data);
      const user = await User.create({
        _USERNAME: data._USERNAME,
        _EMAIL: data._EMAIL,
        _PASSWORD: data._PASSWORD,
      });
      console.log(user);
      const { _USER_ID, _USERNAME, _EMAIL, _CREATED_AT } = user;
      return { _USER_ID, _USERNAME, _EMAIL, _CREATED_AT };
    } catch (error: any) {
      console.log(error);
    }
  }

  static async getUserDetails() {}

  static async updateuserDetails() {}
}
