export interface UserDTO {
    _USER_ID: string;
    _USERNAME: string;
    _EMAIL: string;
  }
  
  export interface MultUserDTO {
    users: UserDTO[];
  }