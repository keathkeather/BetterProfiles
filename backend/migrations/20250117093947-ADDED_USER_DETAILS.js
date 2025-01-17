'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('UserDetails', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      _USER_ID: {
        type: Sequelize.UUID,
        references: {
          model: 'Users',
          key: '_USER_ID',
        },
        allowNull: false,
        onDelete: 'CASCADE',
      },
      _ADDRESS: Sequelize.STRING,
      _BIRTHDATE: Sequelize.DATE,
      _CONTACTNUMBER: Sequelize.STRING,
      _EMERGENCY_CONTACT_NAME: Sequelize.STRING,
      _EMERGENCY_CONTACT_NUMBER: Sequelize.STRING,
      _POSITION: Sequelize.STRING,
      _COMPANY_EMAIL: Sequelize.STRING,
      _HIGHSCHOOL: Sequelize.STRING,
      _COLLEGE: Sequelize.STRING,
      _ORGANIZATIONS: Sequelize.TEXT,
      _HATCHIT_START_DATE: Sequelize.DATE,
      _HATCHIT_REGULARIZATION_DATE: Sequelize.DATE,
      _PROJECTS_INVOLVED: Sequelize.TEXT,
      _HATCHIT_PASSIONS: Sequelize.TEXT,
      _CUSTOM_INFORMATION: {
        type: Sequelize.JSON,
        allowNull: true, 
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('UserDetails');
  }
};
