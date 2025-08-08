'use strict';

const { JobListing } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await JobListing.bulkCreate([
      {
        employerId: 1,
        companyId: 1,
        city: 'New York',
        state: 'NY',
        title: 'Frontend Developer',
        description: 'Looking for a React.js developer.',
      },
      {
        employerId: 2,
        companyId: 2,
        city: 'San Francisco',
        state: 'CA',
        title: 'Backend Developer',
        description: 'Seeking Node.js and PostgreSQL experience.',
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'JobListings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      title: { [Op.in]: ['Frontend Developer', 'Backend Developer'] }
    }, {});
  }
};
