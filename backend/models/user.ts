'use strict';

import { Model, DataTypes, Sequelize, Optional } from 'sequelize';

// Define UserAttributes (fields in the table)
interface UserAttributes {
  _USER_ID: string;
  _USERNAME: string;
  _EMAIL: string;
  _PASSWORD: string;
  _CREATED_AT: Date;
}

// Define UserCreationAttributes for creation (exclude auto-generated fields)
interface UserCreationAttributes
  extends Optional<UserAttributes, '_USER_ID' | '_CREATED_AT'> {}

// Define the User model
module.exports = (sequelize: Sequelize) => {
  class User
    extends Model<UserAttributes, UserCreationAttributes>
    implements UserAttributes
  {
    public _USER_ID!: string;
    public _USERNAME!: string;
    public _EMAIL!: string;
    public _PASSWORD!: string;
    public _CREATED_AT!: Date;

    // Associations
    static associate(models: Record<string, any>) {
      User.hasOne(models.UserDetails, {
        foreignKey: '_USER_ID',
        as: 'userDetails',
        onDelete: 'CASCADE',
      });
    }
  }

  // Initialize the User model
  User.init(
    {
      _USER_ID: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      _USERNAME: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      _EMAIL: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true, // Validate email format
        },
      },
      _PASSWORD: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      _CREATED_AT: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'Users',
      timestamps: false, // Disable automatic `createdAt` and `updatedAt` fields
    }
  );

  return User;
};
