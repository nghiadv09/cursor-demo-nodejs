const { Sequelize } = require('sequelize');
// Luôn load dotenv để sử dụng database thật
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'demo_nodejs',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'test' ? false : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

module.exports = sequelize;
