import { Op } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'user',
    {
      firstname: {
        type: DataTypes.STRING(256),
        allowNull:false
      },
      lastname: {
        type: DataTypes.STRING(256),
        allowNull:false
      },
      email: {
        type: DataTypes.STRING(256),
        allowNull:false,
        unique: {
          args: 'email',
          msg: 'Email should be unique!',
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull:false
      },
      phoneNumber: {
        type: DataTypes.STRING(256),
        allowNull:false,
        unique: {
          args: 'phoneNumber',
          msg: 'The phoneNumber is already taken!',
        }
      },
      profileImage: {
        type: DataTypes.STRING,
        // set(val) {
        //   let tmpStr = val;
        //   tmpStr = tmpStr.replace(/\\/g, '/');
        //   this.setDataValue('profileImage', tmpStr);
        // }
      }
    }
  );

  sequelize.sync()
    .then(() => {
      console.log("User table created...");
    })
    .catch(err => {
      console.log("Something went wrong");
      console.log(err);
    })
    
  return user;
};

