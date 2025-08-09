'use strict';

const { JobHistory } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await JobHistory.bulkCreate([
      {
        userId: 1,
        employer: 'Tech Corp',
        city: 'San Francisco',
        state: 'CA',
        startDate: new Date('2020-01-15'),
        endDate: new Date('2022-06-30'),
      },
      {
        userId: 2,
        employer: 'Biz Solutions',
        city: 'New York',
        state: 'NY',
        startDate: new Date('2019-03-01'),
        endDate: new Date('2021-11-15'),
      },
      {
        userId: 1,
        employer: 'DataWorks',
        city: 'Chicago',
        state: 'IL',
        startDate: new Date('2018-05-01'),
        endDate: new Date('2019-12-31'),
      }
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'JobHistories';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      employer: { [Op.in]: ['Tech Corp', 'Biz Solutions', 'DataWorks'] }
    }, {});
  }
};
