'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // A Company can have many Users (if they're employers)
      Company.hasMany(models.User, { foreignKey: 'companyId' });

      // A Company can have any JobListings (created by employers)
      Company.hasMany(models.JobListing, { foreignKey: 'companyId' });
    }
  }
  Company.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 2]
      }
    },
    website: {
      type: DataTypes.STRING,
      // validate: {
      //   isUrl: true
      // }
    },
    phone: {
      type: DataTypes.BIGINT,
      validate: {
        isNumeric: true
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    }
  }, {
    sequelize,
    modelName: 'Company',
  });

  return Company;
};

