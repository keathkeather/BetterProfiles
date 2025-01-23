import { v4 as uuidv4 } from 'uuid';

export const userDetails = [
  {
    id: uuidv4(),
    _USER_ID: '1b9a08a6-f9bb-4ce5-9c5e-e2d7261cf642', // Replace with actual User ID
    _ADDRESS: '1234 Elm Street, Springfield',
    _BIRTHDATE: new Date('1995-05-15'),
    _CONTACTNUMBER: '+1234567890',
    _EMERGENCY_CONTACT_NAME: 'Jane Doe',
    _EMERGENCY_CONTACT_NUMBER: '+9876543210',
    _POSITION: 'Software Engineer',
    _COMPANY_EMAIL: 'keath.lavador@company.com',
    _HIGHSCHOOL: 'Springfield High School',
    _COLLEGE: 'Springfield University',
    _ORGANIZATIONS: 'Hackathon Club, AI Society',
    _HATCHIT_START_DATE: new Date('2023-01-01'),
    _HATCHIT_REGULARIZATION_DATE: new Date('2023-07-01'),
    _PROJECTS_INVOLVED: 'Project A, Project B',
    _HATCHIT_PASSIONS: 'Innovating through technology',
    _CUSTOM_INFORMATION: JSON.stringify({
      hobbies: ['coding', 'gaming'],
      skills: ['JavaScript', 'React'],
    }),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuidv4(),
    _USER_ID: '1b9a08a6-f9bb-4ce5-9c5e-e2d7261cf642', // Replace with actual User ID
    _ADDRESS: '5678 Oak Avenue, Metropolis',
    _BIRTHDATE: new Date('1990-12-20'),
    _CONTACTNUMBER: '+1122334455',
    _EMERGENCY_CONTACT_NAME: 'John Smith',
    _EMERGENCY_CONTACT_NUMBER: '+5544332211',
    _POSITION: 'Product Manager',
    _COMPANY_EMAIL: 'jane.doe@company.com',
    _HIGHSCHOOL: 'Metropolis High School',
    _COLLEGE: 'Metropolis State University',
    _ORGANIZATIONS: 'Entrepreneurs Network, Product Guild',
    _HATCHIT_START_DATE: new Date('2022-06-15'),
    _HATCHIT_REGULARIZATION_DATE: new Date('2022-12-15'),
    _PROJECTS_INVOLVED: 'Project X, Project Y',
    _HATCHIT_PASSIONS: 'Driving product excellence',
    _CUSTOM_INFORMATION: JSON.stringify({
      certifications: ['PMP', 'Scrum Master'],
    }),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
