'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('USERS', {
      _USER_ID: {
        primaryKey:true,
        type:Sequelize.UUID,
        defaultValue:Sequelize.UUIDV4,
        allowNull:false,
      },
      _USERNAME: {
        type:Sequelize.STRING,
        allowNull:false,
        unique:true,
      },
      _EMAIL: {
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
      },
      _PASSWORD: {
        type:Sequelize.STRING,
        allowNull:false
      },
      _CREATED_AT:{
        type:Sequelize.DATE,
        allowNull:false,
        defaultValue:Sequelize.NOW
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('USERS');
  }
};