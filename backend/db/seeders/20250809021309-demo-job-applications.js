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
        userId: 1, // Demo
        jobListingId: 6, // Frontend Developer
        status: 'applied'
      },
      {
        userId: 2, // Marnie
        jobListingId: 1, // Frontend Developer
        status: 'rejected'
      },
      {
        userId: 3, // Bobbie
        jobListingId: 2, // Backend Developer
        status: 'applied'
      },
      {
        userId: 4, // Liam
        jobListingId: 3, // Data Analyst
        status: 'applied'
      },
      {
        userId: 5, // Karen
        jobListingId: 4, // DevOps Engineer
        status: 'interviewing'
      },
      {
        userId: 6, // Michael
        jobListingId: 2, // Backend Developer
        status: 'applied'
      },
      {
        userId: 5, // Karen
        jobListingId: 1, // Frontend Developer
        status: 'applied'
      },
      {
        userId: 2, // Marnie
        jobListingId: 5, // Product Manager
        status: 'rejected'
      },
      {
        userId: 1, // Demo
        jobListingId: 6, // UI/UX Designer
        status: 'applied'
      },
      {
        userId: 3, // Bobbie
        jobListingId: 5, // Product Manager
        status: 'interviewing'
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
