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
        description: '<p>Looking for a React.js developer.</p>',
      },
      {
        employerId: 2,
        companyId: 2,
        city: 'San Francisco',
        state: 'CA',
        title: 'Backend Developer',
        description: '<p>Seeking Node.js and PostgreSQL experience.</p>',
      },
      {
        employerId: 1,
        companyId: 3,
        city: 'Chicago',
        state: 'IL',
        title: 'Data Analyst',
        description: '<p>Seeking an entry-level analyst proficient in Excel and SQL.</p>',
      },
      {
        employerId: 2,
        companyId: 4,
        city: 'Austin',
        state: 'TX',
        title: 'DevOps Engineer',
        description: '<p>Looking for experience with AWS, Docker, and CI/CD pipelines.</p>',
      },
      {
        employerId: 1,
        companyId: 5,
        city: 'Remote',
        state: 'CA',
        title: 'Product Manager',
        description: '<p>Responsible for roadmap planning, user stories, and agile ceremonies.</p>',
      },
      {
        employerId: 2,
        companyId: 6,
        city: 'Seattle',
        state: 'WA',
        title: 'UI/UX Designer',
        description: '<p>Must have strong Figma skills and portfolio demonstrating design systems.</p>',
      },
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'JobListings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      title: { [Op.in]: [
        'Frontend Developer', 
        'Backend Developer',
        'Data Analyst',
        'DevOps Engineer',
        'Product Manager',
        'UI/UX Designer'
      ] }
    }, {});
  }
};
