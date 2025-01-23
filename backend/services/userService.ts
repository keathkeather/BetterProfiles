import { userDTO } from '../DTO/userDto';
import db from '../models';
import { UserDetailsDTO } from '../DTO/fullUserDetailDto';
import { fetchUserDto } from '../DTO/fetchUserDTO';
import { MultUserDTO, UserDTO } from '../DTO/multUserDTO';
const bcrypt = require('bcrypt');
export default class UserService {
  
  static async create_user(data: userDTO) {
    try {

      const saltedPassword = process.env._SALT = data._PASSWORD;
      const hashedPassword = await bcrypt.hash(saltedPassword, 10);
      const user = await db.User.create({
        _USERNAME: data._USERNAME,
        _EMAIL: data._EMAIL,
        _PASSWORD: hashedPassword,
      });
      await db.UserDetails.create({
        _USER_ID: user._USER_ID,
      });
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
  static getUserById(_USER_ID: string) {
    return db.User.findByPk(_USER_ID);
  }

  static async add_user_details(_User_ID: string) {}

  static async update_user_and_details(_USER_ID: string, userData: Partial<Pick<userDTO, '_USERNAME'>>, userDetailsData: Partial<UserDetailsDTO['userDetails']>) {
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

      // Merge existing user data with new data (only updating username)
      const updatedUserData = {
        _USERNAME: userData._USERNAME || user._USERNAME,
      };

      // Update user basic information (only username)
      await user.update(updatedUserData);

      // Merge existing user details data with new data
      const userDetails = user.userDetails;
      const updatedUserDetailsData = {
        _ADDRESS: userDetailsData._ADDRESS || userDetails._ADDRESS,
        _BIRTHDATE: userDetailsData._BIRTHDATE || userDetails._BIRTHDATE,
        _CONTACTNUMBER: userDetailsData._CONTACTNUMBER || userDetails._CONTACTNUMBER,
        _EMERGENCY_CONTACT_NAME: userDetailsData._EMERGENCY_CONTACT_NAME || userDetails._EMERGENCY_CONTACT_NAME,
        _EMERGENCY_CONTACT_NUMBER: userDetailsData._EMERGENCY_CONTACT_NUMBER || userDetails._EMERGENCY_CONTACT_NUMBER,
        _POSITION: userDetailsData._POSITION || userDetails._POSITION,
        _COMPANY_EMAIL: userDetailsData._COMPANY_EMAIL || userDetails._COMPANY_EMAIL,
        _HIGHSCHOOL: userDetailsData._HIGHSCHOOL || userDetails._HIGHSCHOOL,
        _COLLEGE: userDetailsData._COLLEGE || userDetails._COLLEGE,
        _ORGANIZATIONS: userDetailsData._ORGANIZATIONS || userDetails._ORGANIZATIONS,
        _HATCHIT_START_DATE: userDetailsData._HATCHIT_START_DATE || userDetails._HATCHIT_START_DATE,
        _HATCHIT_REGULARIZATION_DATE: userDetailsData._HATCHIT_REGULARIZATION_DATE || userDetails._HATCHIT_REGULARIZATION_DATE,
        _PROJECTS_INVOLVED: userDetailsData._PROJECTS_INVOLVED || userDetails._PROJECTS_INVOLVED,
        _HATCHIT_PASSIONS: userDetailsData._HATCHIT_PASSIONS || userDetails._HATCHIT_PASSIONS,
        _CUSTOM_INFORMATION: userDetailsData._CUSTOM_INFORMATION || userDetails._CUSTOM_INFORMATION,
      };

      // Update user details information
      await userDetails.update(updatedUserDetailsData);

      return { user, userDetails };
    } catch (error: any) {
      console.log(error);
      return null;
    }
  }


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

  static async getUser(_USER_ID:string){
    try{
      const userData = await db.User.findByPk(_USER_ID);

      const userDetails :fetchUserDto = {
        _USER_ID: userData._USER_ID,
        _USERNAME: userData._USERNAME,
        _EMAIL: userData._EMAIL
      }


      return userDetails;
    }catch(error:any){
      console.log(error);
    }
  }
  static async search_user_by_name(_USERNAME: string): Promise<MultUserDTO | null> {
    try {
      const users = await db.User.findAll({
        where: {
          _USERNAME: {
            [db.Sequelize.Op.like]: `%${_USERNAME}%`
          }
        }
      });
      const userData: UserDTO[] = users.map((user: any) => {
        return {
          _USER_ID: user._USER_ID,
          _USERNAME: user._USERNAME,
          _EMAIL: user._EMAIL,
          _CREATED_AT: user._CREATED_AT
        };
      });
      return { users: userData };
    } catch (error: any) {
      console.log(error);
      return null;
    }
  }
}
