import { Op } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'user',
    {
      firstname: {
        type: DataTypes.STRING(256),
      },
      lastname: {
        type: DataTypes.STRING(256),
      },
      email: {
        type: DataTypes.STRING(256),
        unique:true,
        validate:{
          isEmail:true
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
        },
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

