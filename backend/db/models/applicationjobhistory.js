'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ApplicationJobHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // ApplicationJobHistory belongs to a JobApplication
      ApplicationJobHistory.belongsTo(models.JobApplication, { foreignKey: 'applicationId' });

      // ApplicationJobHistory belongs to a JobHistory
      ApplicationJobHistory.belongsTo(models.JobHistory, { foreignKey: 'jobHistoryId' });
    }
  }
  ApplicationJobHistory.init({
    applicationId: DataTypes.INTEGER,
    jobHistoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ApplicationJobHistory',
  });
  return ApplicationJobHistory;
};
