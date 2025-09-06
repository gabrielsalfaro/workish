'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Watchlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Watchlist belongs to a JobListing
      Watchlist.belongsTo(models.JobListing, { foreignKey: 'jobListingId' });

      // Watchlist belongs to User
      Watchlist.belongsTo(models.User, { foreignKey: 'userId' });

    }
  }
  Watchlist.init({
    userId: DataTypes.INTEGER,
    jobListingId: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Watchlist',
  });
  return Watchlist;
};