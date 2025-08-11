'use strict';
// /** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('JobListings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      employerId: {
        type: Sequelize.INTEGER,
        refernces: {
          model: 'Users',
          key: 'id'
        },
        // onUpdate: 'CASCADE',
        // onDelete: 'SET NULL'
      },
      companyId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Companies',
          keky: 'id'
        },
        // onUpdate: 'CASCADE',
        // onDelete: 'SET NULL'
      },
      city: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    }, options);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('JobListings', options);
  }
};