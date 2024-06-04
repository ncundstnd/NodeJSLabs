const { Sequelize } = require('sequelize');
const initModels = require("./models/init-models");
const sequelize = new Sequelize('postgres://postgres:1234@localhost:5432/KIO-4');

// Создание таблиц на основе моделей
async function createTables() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Инициализация моделей
    const models = initModels(sequelize);

    // Создание таблиц
    await models.Weapons.sync({ alter: true });
    await models.Pizzas.sync({ alter: true });
    await models.Turtles.sync({ alter: true });

    console.log('Tables have been created successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

createTables();
