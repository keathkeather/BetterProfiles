export interface UserDetailsDTO {
  _USER_ID: string; // Unique identifier for the user
  _USERNAME: string; // User's name
  _EMAIL: string; // User's email
  userDetails: {
    _ADDRESS: string; // Address of the user
    _BIRTHDATE: string; // Birthdate of the user
    _CONTACTNUMBER: string; // Contact number of the user
    _EMERGENCY_CONTACT_NAME: string; // Emergency contact name
    _EMERGENCY_CONTACT_NUMBER: string; // Emergency contact number
    _POSITION: string; // Job position
    _COMPANY_EMAIL: string; // Company email address
    _HIGHSCHOOL: string; // High school attended
    _COLLEGE: string; // College attended
    _ORGANIZATIONS: string; // Organizations the user is part of
    _HATCHIT_START_DATE: string; // Start date in HatchIT
    _HATCHIT_REGULARIZATION_DATE: string; // Regularization date in HatchIT
    _PROJECTS_INVOLVED: string; // Projects the user is involved in
    _HATCHIT_PASSIONS: string; // Passions at HatchIT
    _CUSTOM_INFORMATION: string; // Custom JSON string for hobbies, skills, etc.
  };
}
