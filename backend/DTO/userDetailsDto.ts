import { Json } from 'sequelize/types/utils';

export interface UserDetailsDto {
  _USER_ID: string;
  _ADDRESS: string;
  _BIRTHDATE: string;
  _CONTACTNUMBER: string;
  _EMERGENCY_CONTACT_NAME: string;
  _EMERGENCY_CONTACT_NUMBER: string;
  _POSITION: string;
  _COMPANY_EMAIL: string;
  _HIGHSCHOOL: string;
  _COLLEGE: string;
  _ORGANIZATIONS: string;
  _HATCHIT_START_DATE: string;
  _HATCHIT_REGULARIZATION_DATE: string;
  _PROJECTS_INVOLVED: string;
  _HATCHIT_PASSIONS: string;
  _CUSTOM_INFORMATION: Record<string, string>;
}
