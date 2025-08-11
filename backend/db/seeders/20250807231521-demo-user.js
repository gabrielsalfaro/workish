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
        profileImg: 'https://example.com/image.jpg',
        phone: 1234567890,
        city: 'San Francisco',
        state: 'CA',
        jobTitle: 'Developer Advocate',
        summary: 'Demo user for the app.',
        companyId: 1,
        createdAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
      },
      {
        email: 'user1@user.io',
        username: 'FakeUser1',
        firstName: 'Fake1',
        lastName: 'User',
        hashedPassword: bcrypt.hashSync('password'),
        profileImg: 'https://example.com/image.jpg',
        phone: 2345678901,
        city: 'New York',
        state: 'NY',
        jobTitle: 'Full Stack Engineer',
        summary: 'A passionate coder.',
        companyId: 2,
        createdAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
      },
      {
        email: 'user2@user.io',
        username: 'FakeUser2',
        firstName: 'Fake2',
        lastName: 'User',
        hashedPassword: bcrypt.hashSync('password'),
        profileImg: 'https://example.com/image.jpg',
        phone: 3456789012,
        city: 'Chicago',
        state: 'IL',
        jobTitle: 'Project Manager',
        summary: 'Detail-oriented and driven.',
        companyId: 1,
        createdAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['demo', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
