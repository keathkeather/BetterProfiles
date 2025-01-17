const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { on } = require('events');

const UserDetails = sequelize.define('UserDetails', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  _USER_ID: {
    type: DataTypes.UUID,
    references: {
      model: 'Users',
      key: '_USER_ID',
    },
    allowNull: false,
  },
  _ADDRESS: DataTypes.STRING,
  _BIRTHDATE: DataTypes.DATE,
  _CONTACTNUMBER: DataTypes.STRING,
  _EMERGENCY_CONTACT_NAME: DataTypes.STRING,
  _EMERGENCY_CONTACT_NUMBER: DataTypes.STRING,
  _POSITION: DataTypes.STRING,
  _COMPANY_EMAIL: DataTypes.STRING,
  _HIGHSCHOOL: DataTypes.STRING,
  _COLLEGE: DataTypes.STRING,
  _ORGANIZATIONS: DataTypes.TEXT,
  _HATCHIT_START_DATE: DataTypes.DATE,
  _HATCHIT_REGULARIZATION_DATE: DataTypes.DATE,
  _PROJECTS_INVOLVED: DataTypes.TEXT,
  _HATCHIT_PASSIONS: DataTypes.TEXT,
  _CUSTOM_INFORMATION: {
    type: DataTypes.JSON,
    allowNull: true, 
  },
}, {
  timestamps: true,
});

UserDetails.associate = (models) => {
  UserDetails.belongsTo(models.User, {
    foreignKey: '_USER_ID',
    as: 'user',
    onDelete: 'CASCADE',
  });
};

module.exports = UserDetails;
