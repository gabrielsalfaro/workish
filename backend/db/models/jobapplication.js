'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class JobApplication extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Job Application belongs to a User
      JobApplication.belongsTo(models.User, { foreignKey: 'userId' });

      // JobApplication belongs to a Job Listing
      JobApplication.belongsTo(models.JobListing, { foreignKey: 'jobListingId' });

      // JobApplication belongs to many JobHistories through join table
      JobApplication.belongsToMany(models.JobHistory, {
        through: 'ApplicationJobHistory',
        foreignKey: 'applicationId',
        otherKey: 'jobHistoryId'
      });

      // JobApplication has many Attachments
      // JobApplication.hasMany(models.Attachment, { foreignKey: 'id' });
    }
  }
  JobApplication.init({
    userId: DataTypes.INTEGER,
    jobListingId: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'JobApplication',
  });
  return JobApplication;
};