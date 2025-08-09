'use strict';
// /** @type {import('sequelize-cli').Migration} */
const { ApplicationJobHistory } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'ApplicationJobHistories'; // pluralized model name
    await queryInterface.bulkInsert(options, [
      {
        applicationId: 1,
        jobHistoryId: 1,
        createdAt: new Date('2025-07-04'),
        updatedAt: new Date('2025-07-05')
      },
      {
        applicationId: 1,
        jobHistoryId: 2,
        createdAt: new Date('2025-07-05'),
        updatedAt: new Date('2025-07-06')
      },
      {
        applicationId: 2,
        jobHistoryId: 3,
        createdAt: new Date('2025-07-06'),
        updatedAt: new Date('2025-07-07')
      }
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'ApplicationJobHistories';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      applicationId: { [Op.in]: [1, 2] }
    }, {});
  }
};
