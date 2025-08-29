'use strict';

const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
       // A User belongs to a Company (the one they work at)
      User.belongsTo(models.Company, { foreignKey: 'companyId' });

      // A User can have many JobListings (if they're an employer)
      User.hasMany(models.JobListing, { foreignKey: 'employerId' });

      // A User can have many JobApplications
      User.hasMany(models.JobApplication, { foreignKey: 'userId' });

      // A User can have many entries in their job history
      User.hasMany(models.JobHistory, { foreignKey: 'userId' });

      // A User can have many Watchlist entries
      User.hasMany(models.Watchlist, { foreignKey: 'userId' });
    }
  }

  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error('Cannot be an email.');
            }
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [3, 256],
          isEmail: true,
        },
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [2, 50],
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [2, 50],
        },
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60],
        },
      },
      profileImg: {
        type: DataTypes.STRING,
        validate: {
          isUrl: true,
        },
      },
      phone: {
        type: DataTypes.BIGINT, 
        validate: {
          isNumeric: true,
        },
      },
      city: {
        type: DataTypes.STRING,
        validate: {
          len: [2, 50],
        },
      },
      state: {
        type: DataTypes.STRING,
        validate: {
          len: [2, 2],
        },
      },
      jobTitle: {
        type: DataTypes.STRING,
        validate: {
          len: [2, 100],
        },
      },
      summary: {
        type: DataTypes.TEXT,
      },
      companyId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Companies',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
      defaultScope: {
        attributes: {
          exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt'],
        },
      },
    }
  );

  return User;
};
