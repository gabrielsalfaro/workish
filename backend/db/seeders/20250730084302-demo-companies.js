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
        email: 'info@techcorp.com',
        logo: '#'
      },
      {
        name: 'Biz Solutions',
        city: 'New York',
        state: 'NY',
        website: '#',
        phone: 9876543210,
        email: 'contact@bizsolutions.io',
        logo: '#'
      },
      {
        name: 'DataWorks',
        city: 'Chicago',
        state: 'IL',
        website: '#',
        phone: 5551234567,
        email: 'hello@dataworks.net',
        logo: '#'
      },
      {
        name: 'InnovateX',
        city: 'Austin',
        state: 'TX',
        website: '#',
        phone: 5121234567,
        email: 'hello@innovatex.com',
        logo: '#'
      },
      {
        name: 'GreenStack',
        city: 'Seattle',
        state: 'WA',
        website: '#',
        phone: 2069876543,
        email: 'info@greenstack.io',
        logo: '#'
      },
      {
        name: 'HealthBridge',
        city: 'Boston',
        state: 'MA',
        website: '#',
        phone: 6175551122,
        email: 'contact@healthbridge.com',
        logo: '#'
      },
      {
        name: 'SkyNetics',
        city: 'Los Angeles',
        state: 'CA',
        website: '#',
        phone: 3101237890,
        email: 'admin@skynetics.ai',
        logo: '#'
      },
      {
        name: 'FinEdge',
        city: 'Denver',
        state: 'CO',
        website: '#',
        phone: 3039873210,
        email: 'team@finedge.co',
        logo: '#'
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
