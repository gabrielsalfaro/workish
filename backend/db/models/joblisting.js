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
      // JobListing belongs to a User (employer)
      JobListing.belongsTo(models.User, { foreignKey: 'employerId' });

      // JobListing belongs to a Company
      JobListing.belongsTo(models.Company, { foreignKey: 'companyId' });

      // JobListing has many JobApplications
      JobListing.hasMany(models.JobApplication, { foreignKey: 'jobListingId' });
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