import Sequelize from 'sequelize';
import fs from 'fs';
import path from 'path';
import config from '../config/index.js';

const dbConfig = config.database.mysql;
const db = {};
const sequelize = new Sequelize(dbConfig.db, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  port: dbConfig.port,
  timezone: dbConfig.timezone,
  logging: () => {
    // logger.infoLogger.info(message);
    // console.log(message)
  },
  dialect: 'mysql'
});

fs.readdirSync(__dirname)
  .filter((file) => file.indexOf('.') !== 0 && file !== 'index.js')
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes,
    );  
    db[model.name] = model;
  });

  
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
