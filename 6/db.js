const { Sequelize } = require('sequelize');
const config = require('./config');

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  port: config.port,
  dialect: config.dialect,
  pool: {
    max: 5, // Максимальное количество соединений в пуле
    min: 0, // Минимальное количество соединений в пуле
    acquire: 30000, // Время ожидания в миллисекундах до получения соединения
    idle: 10000 // Время в миллисекундах, после которого неиспользуемое соединение будет удалено из пула
  }
});

module.exports = sequelize;
