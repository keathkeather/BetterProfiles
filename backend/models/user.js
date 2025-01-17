'use strict';
const {
  Model
} = require('sequelize');
const UserDetails = require('./userdetails');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.UserDetails,{
        foreignKey: '_USER_ID',
        as: 'userDetails',
        onDelete:'CASCADE',
      });
    }
  }
  User.init({
    _USER_ID: {
      primaryKey:true,
      type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      allowNull:false
    },
    _USERNAME: {
      type:DataTypes.STRING,
      allowNull:false,
      unique:true,
    },
    _EMAIL: {
      type:DataTypes.STRING,
      allowNull:false,
      unique:true
    },
    _PASSWORD: {
      type:DataTypes.STRING,
      allowNull:false
    },
    _CREATED_AT:{
      type:DataTypes.DATE,
      allowNull:false,
      defaultValue:DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};