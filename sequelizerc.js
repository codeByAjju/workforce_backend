require("@babel/register");
require('dotenv').config()
const path = require('path');
 
module.exports = {
  'config':          path.resolve('config', 'database.js'),
  'migrations-path': path.resolve('config', 'migrations'),
  'seeders-path':    path.resolve('config', '../config/seeders'),
  'models-path':     path.resolve('src', 'models'),
}