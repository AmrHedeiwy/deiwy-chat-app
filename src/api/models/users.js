const { Model } = require('sequelize');
const hooks = require('../services/hooks');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {}

  User.init(
    {
      UserID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      Firstname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: {
            args: /^[A-Za-z]{2,30}$/,
            msg:
              'First name can only contain letters,' +
              'and must be between 2 and 30 characters long',
          },
        },
      },
      Lastname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: {
            args: /^[A-Za-z]{2,30}$/,
            msg:
              'Last name can only contain letters,' +
              'and must be between 2 and 30 characters long',
          },
        },
      },
      Username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: {
            args: /^[A-Za-z\d_-]{3,20}$/,
            msg:
              'Username can only contain letters, digits, ' +
              'underscores, and hyphens, and must be between ' +
              '3 and 20 characters long.',
          },
        },
      },
      Userkey: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: {
            msg:
              'Please enter a valid email address' +
              'in the format example@example.com.',
          },
        },
      },
      Password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: {
            args: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&*]{8,}$/,
            msg:
              'Password must be at least 8 characters long ' +
              'and contain at least one uppercase letter, ' +
              'one lowercase letter, one digit, ' +
              'and one special character from the set @$!%?&.',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      hooks,
    }
  );

  return User;
};
