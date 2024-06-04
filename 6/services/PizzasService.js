const sequelize = require('../db');
const { Op } = require('sequelize');
const initModels = require('../models/init-models');

try {
  sequelize.authenticate();
  console.log('Connection to the database has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

const models = initModels(sequelize);

async function getAllPizzas() {
  try {
    const pizzas = await models.Pizzas.findAll();
    return pizzas;
  } catch (error) {
    throw new Error('Failed to get all pizzas');
  }
}

async function getPizzaById(id) {
  try {
    const pizza = await models.Pizzas.findByPk(id);
    return pizza;
  } catch (error) {
    throw new Error('Failed to get pizza by ID');
  }
}

async function getPizzasWithGreaterCalories(gt) {
  try {
    const pizza = await models.Pizzas.findAll({ where: { calories: { [Op.gt]: gt } } });
    return pizza;
  } catch (error) {
    throw new Error('Failed to get pizza by ID');
  }
}

async function getPizzasWithLowerCalories(lt) {
  try {
    const pizza = await models.Pizzas.findAll({ where: { calories: { [Op.lt]: lt } } });
    return pizza;
  } catch (error) {
    throw new Error('Failed to get pizza by ID');
  }
}

async function createPizza(pizzaData) {
  try {
    if (!pizzaData.id || !pizzaData.calories || !pizzaData.name) {
      throw new Error('All fields are required');
    }

    if (pizzaData.calories > 2000) {
      throw new Error('calories cannot exceed 2000');
    }

    const existingPizza = await models.Pizzas.findByPk(pizzaData.id);
    if (existingPizza) {
      throw new Error('Pizza with this id already exists');
    }

    const pizza = await models.Pizzas.create(pizzaData);
    return pizza;
  } catch (error) {
    throw new Error('Failed to create pizza: ' + error.message);
  }
}

async function updatePizza(pizzaData) {
  try {
    const pizza = await models.Pizzas.findByPk(pizzaData.id);
    if (!pizza) {
      throw new Error('Pizza not found');
    }

    if (!pizzaData.id || !pizzaData.calories || !pizzaData.name) {
      throw new Error('All fields are required');
    }

    if (pizzaData.calories > 2000) {
      throw new Error('calories cannot exceed 500');
    }

    await models.Pizzas.update(pizzaData, { where: { id: pizzaData.id } });
    return { message: 'Pizza updated successfully' };
  } catch (error) {
    throw new Error('Failed to update pizza: ' + error.message);
  }
}

async function deletePizza(id) {
  try {
    const pizza = await models.Pizzas.findByPk(id);
    if (!pizza) {
      throw new Error('Pizza not found');
    }
    await models.Pizzas.destroy({ where: { id } });
    return { message: 'Pizza deleted successfully' };
  } catch (error) {
    throw new Error('Failed to delete pizza: ' + error.message);
  }
}

async function addSuperFatToCalorieExceededPizzas() {
  const transaction = await sequelize.transaction();

  try {
    // Находим все пиццы с количеством калорий больше 1500
    const pizzas = await models.Pizzas.findAll({ where: { calories: { [Op.gt]: 1500 } } });

    // Обновляем описание пицц, добавляя "SUPER FAT!"
    await Promise.all(pizzas.map(async (pizza) => {
      pizza.decription += " SUPER FAT!";
      await pizza.save({ transaction });
    }));

    // Фиксируем транзакцию
    await transaction.commit();

    console.log("Description updated for calorie exceeded pizzas.");
  } catch (error) {
    await transaction.rollback();
    console.error("Failed to update description for calorie exceeded pizzas:", error);
  }
}

module.exports = {
  getAllPizzas,
  getPizzaById,
  getPizzasWithLowerCalories,
  getPizzasWithGreaterCalories,
  createPizza,
  updatePizza,
  deletePizza,
  addSuperFatToCalorieExceededPizzas
};