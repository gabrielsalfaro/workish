'use strict';
const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class JobListing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  JobListing.init({
    employerId: DataTypes.INTEGER,
    companyId: DataTypes.INTEGER,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'JobListing',
  });
  return JobListing;
};