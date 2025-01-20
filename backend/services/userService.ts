import { userDTO } from '../DTO/userDto';
import db from '../models';
import { UserDetailsDTO } from '../DTO/fullUserDetailDto';
export default class UserService {
  static async create_user(data: userDTO) {
    try {
      const user = await db.User.create({
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

  static async get_User_By_Id(_USER_ID: string) {
    try {
      const user = await db.User.findByPk(_USER_ID);
      if (user) {
        return user;
      }
    } catch (error: any) {
      console.log(error);
    }
  }

  static async get_user_with_details(
    _USER_ID: string
  ): Promise<UserDetailsDTO | null> {
    try {
      const user = await db.User.findByPk(_USER_ID, {
        include: [
          {
            model: db.UserDetails,
            as: 'userDetails', // Make sure this alias matches your association
          },
        ],
      });

      if (!user) {
        return null;
      }
      const userDetails = user.userDetails.dataValues;

      const userData: UserDetailsDTO = {
        _USER_ID: user._USER_ID,
        _USERNAME: user._USERNAME,
        _EMAIL: user._EMAIL,
        userDetails: {
          _ADDRESS: userDetails._ADDRESS,
          _BIRTHDATE: userDetails._BIRTHDATE,
          _CONTACTNUMBER: userDetails._CONTACTNUMBER,
          _EMERGENCY_CONTACT_NAME: userDetails._EMERGENCY_CONTACT_NAME,
          _EMERGENCY_CONTACT_NUMBER: userDetails._EMERGENCY_CONTACT_NUMBER,
          _POSITION: userDetails._POSITION,
          _COMPANY_EMAIL: userDetails._COMPANY_EMAIL,
          _HIGHSCHOOL: userDetails._HIGHSCHOOL,
          _COLLEGE: userDetails._COLLEGE,
          _ORGANIZATIONS: userDetails._ORGANIZATIONS,
          _HATCHIT_START_DATE: userDetails._HATCHIT_START_DATE,
          _HATCHIT_REGULARIZATION_DATE:
            userDetails._HATCHIT_REGULARIZATION_DATE,
          _PROJECTS_INVOLVED: userDetails._PROJECTS_INVOLVED,
          _HATCHIT_PASSIONS: userDetails._HATCHIT_PASSIONS,
          _CUSTOM_INFORMATION: userDetails._CUSTOM_INFORMATION,
        },
      };

      return userData;
    } catch (error: any) {
      console.log(error);
      throw new Error(error.message);
    }
  }

  static async add_user_details(_User_ID: string) {}

  static async updateuserDetails() {}

  static async delete_user_by_id(_USER_ID: string) {
    try {
      const user = await db.User.findByPk(_USER_ID);
      if (!user) {
        throw new Error('user not found');
      }
      return await user.destroy();
    } catch (error: any) {
      console.log(error);
    }
  }
}
