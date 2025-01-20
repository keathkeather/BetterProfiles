'use strict';

import { Model, DataTypes, Sequelize, Optional } from 'sequelize';

// Define the attributes for UserDetails
interface UserDetailsAttributes {
  id: string;
  _USER_ID: string;
  _ADDRESS?: string;
  _BIRTHDATE?: Date;
  _CONTACTNUMBER?: string;
  _EMERGENCY_CONTACT_NAME?: string;
  _EMERGENCY_CONTACT_NUMBER?: string;
  _POSITION?: string;
  _COMPANY_EMAIL?: string;
  _HIGHSCHOOL?: string;
  _COLLEGE?: string;
  _ORGANIZATIONS?: string;
  _HATCHIT_START_DATE?: Date;
  _HATCHIT_REGULARIZATION_DATE?: Date;
  _PROJECTS_INVOLVED?: string;
  _HATCHIT_PASSIONS?: string;
  _CUSTOM_INFORMATION?: Record<string, any>;
}

// Define the attributes for creating a UserDetails instance (optional fields)
interface UserDetailsCreationAttributes
  extends Optional<UserDetailsAttributes, 'id'> {}

module.exports = (sequelize: Sequelize) => {
  class UserDetails
    extends Model<UserDetailsAttributes, UserDetailsCreationAttributes>
    implements UserDetailsAttributes
  {
    public id!: string;
    public _USER_ID!: string;
    public _ADDRESS?: string;
    public _BIRTHDATE?: Date;
    public _CONTACTNUMBER?: string;
    public _EMERGENCY_CONTACT_NAME?: string;
    public _EMERGENCY_CONTACT_NUMBER?: string;
    public _POSITION?: string;
    public _COMPANY_EMAIL?: string;
    public _HIGHSCHOOL?: string;
    public _COLLEGE?: string;
    public _ORGANIZATIONS?: string;
    public _HATCHIT_START_DATE?: Date;
    public _HATCHIT_REGULARIZATION_DATE?: Date;
    public _PROJECTS_INVOLVED?: string;
    public _HATCHIT_PASSIONS?: string;
    public _CUSTOM_INFORMATION?: Record<string, any>;

    // Define associations
    static associate(models: Record<string, any>) {
      UserDetails.belongsTo(models.User, {
        foreignKey: '_USER_ID',
        as: 'User',
        onDelete: 'CASCADE',
      });
    }
  }

  // Initialize the UserDetails model
  UserDetails.init(
    {
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
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      _ADDRESS: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      _BIRTHDATE: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      _CONTACTNUMBER: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      _EMERGENCY_CONTACT_NAME: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      _EMERGENCY_CONTACT_NUMBER: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      _POSITION: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      _COMPANY_EMAIL: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      _HIGHSCHOOL: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      _COLLEGE: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      _ORGANIZATIONS: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      _HATCHIT_START_DATE: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      _HATCHIT_REGULARIZATION_DATE: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      _PROJECTS_INVOLVED: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      _HATCHIT_PASSIONS: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      _CUSTOM_INFORMATION: {
        type: DataTypes.JSON,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'UserDetails',
      tableName: 'UserDetails',
      timestamps: true, // Enable `createdAt` and `updatedAt`
    }
  );

  return UserDetails;
};
