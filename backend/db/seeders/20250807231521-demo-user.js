'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        email: 'demo@user.io',
        username: 'demo',
        firstName: 'Demo',
        lastName: 'User',
        hashedPassword: bcrypt.hashSync('password'),
        profileImg: 'https://i.imgur.com/sNiiBeb.png',
        phone: 1234567890,
        city: 'San Francisco',
        state: 'CA',
        jobTitle: 'Developer Advocate',
        summary: 'Demo user for the app.',
        companyId: 1,
      },
      {
        email: 'marnie@user.io',
        username: 'marnie',
        firstName: 'Marnie',
        lastName: 'Johnson',
        hashedPassword: bcrypt.hashSync('password'),
        profileImg: 'https://i.imgur.com/8bglUJr.png',
        phone: 2345678901,
        city: 'New York',
        state: 'NY',
        jobTitle: 'Full Stack Engineer',
        summary: 'A passionate coder.',
        companyId: 2,
      },
      {
        email: 'bobbie@user.io',
        username: 'bobbie',
        firstName: 'Bobbie',
        lastName: 'Jones',
        hashedPassword: bcrypt.hashSync('password'),
        profileImg: 'https://i.imgur.com/2R116Ik.png',
        phone: 3456789012,
        city: 'Chicago',
        state: 'IL',
        jobTitle: 'Project Manager',
        summary: 'Detail-oriented and driven.',
        companyId: 3,
      },
      {
        email: 'liam@user.io',
        username: 'liam',
        firstName: 'Liam',
        lastName: 'Garcia',
        hashedPassword: bcrypt.hashSync('password'),
        profileImg: 'https://i.imgur.com/2R116Ik.png',
        phone: 3456789012,
        city: 'Miami',
        state: 'FL',
        jobTitle: 'Sales Associate',
        summary: 'Detail-oriented and driven.',
        companyId: 3,
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['demo', 'marnie', 'bobbie', 'liam'] }
    }, {});
  }
};
