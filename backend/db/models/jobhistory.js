'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class JobHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // JobHistory belongs to a User
      JobHistory.belongsTo(models.User, { foreignKey: 'userId' });

      // JobHistory belongsToMany JobApplications (via join table)
      JobHistory.belongsToMany(models.JobApplication, { 
        through: 'ApplicationJobHistory',
        foreignKey: 'jobHistoryId',
        otherKey: 'applicationId'})
    }
  }
  JobHistory.init({
    userId: DataTypes.INTEGER,
    employer: DataTypes.STRING,
    jobTitle: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'JobHistory',
  });
  return JobHistory;
};