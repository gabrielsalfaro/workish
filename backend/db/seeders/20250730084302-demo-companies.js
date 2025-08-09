'use strict';

const { Company } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await Company.bulkCreate([
      {
        name: 'Tech Corp',
        city: 'San Francisco',
        state: 'CA',
        website: '#',
        phone: 1234567890,
        email: 'info@techcorp.com'
      },
      {
        name: 'Biz Solutions',
        city: 'New York',
        state: 'NY',
        website: '#',
        phone: 9876543210,
        email: 'contact@bizsolutions.io'
      },
      {
        name: 'DataWorks',
        city: 'Chicago',
        state: 'IL',
        website: '#',
        phone: 5551234567,
        email: 'hello@dataworks.net'
      }
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Companies';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['Tech Corp', 'Biz Solutions', 'DataWorks'] }
    }, {});
  }
};
