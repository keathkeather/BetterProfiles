import { loginDTO } from '../DTO/loginDTO';
import db from '../models';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

export default class AuthService{


    static async login_user(data:loginDTO){
        try{
            const user = await db.User.findOne({
                where:{
                    _EMAIL:data._EMAIL
                }
            });
            if(!user){
                return {message:'User not found'};
            }
            const validPassword = await AuthService.validatePassword(data._PASSWORD,user._PASSWORD);
            console.log(`Valid Password: ${validPassword}`);
            if(validPassword==false){
                return {message:'Invalid Password'};
            }
            const token = jwt.sign({ id: user._USER_ID, email: user._EMAIL }, process.env._SECRET_KEY, { expiresIn: '1h' });
            console.log(token);
            return {token:token};
        }catch(error:any){
            console.log(error);
        }
    }
    static async validatePassword(password:string, hashedPassword:string):Promise<boolean>{
        try{
            const validPassword = await bcrypt.compare(password, hashedPassword);
            console.log(validPassword)
            return validPassword;
        }catch(error:any){
            console.log(error);
            return false; 
        }
    }
}