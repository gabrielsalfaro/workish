'use strict';

const { JobApplication } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await JobApplication.bulkCreate([
      {
        userId: 1,
        jobListingId: 1,
        status: 'applied'
      },
      {
        userId: 2,
        jobListingId: 1,
        status: 'rejected'
      },
      {
        userId: 3,
        jobListingId: 2,
        status: 'applied'
      }
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'JobApplications';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
