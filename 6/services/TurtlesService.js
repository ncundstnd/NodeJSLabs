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

async function getAllTurtles() {
  try {
    const turtles = await models.Turtles.findAll();
    return turtles;
  } catch (error) {
    throw new Error('Failed to get all turtles');
  }
}

async function getTurtleById(id) {
  try {
    const turtle = await models.Turtles.findByPk(id);
    return turtle;
  } catch (error) {
    throw new Error('Failed to get turtle by ID');
  }
}

async function getTurtlesByFavoriteTurtle(name) {
  try {
    const pizza = await models.Pizzas.findOne({ where: { name: name } });
    const turtles = await models.Turtles.findAll({
      where: {
        [Op.or]: [
          { favoritePizzaId: pizza.id },
          { secondFavoritePizzaId: pizza.id }
        ]
      }
    });
    return turtles;
  } catch (error) {
    throw new Error(`Failed to get turtles by favorite turtle: ${name}`);
  }
}

async function createTurtle(turtleData) {
  try {
    if (!turtleData.id || !turtleData.name || !turtleData.color) {
      throw new Error('All fields are required');
    }

    const existingTurtle = await models.Turtles.findByPk(turtleData.id);
    if (existingTurtle) {
      throw new Error('Turtle with this id already exists');
    }

    const turtle = await models.Turtles.create(turtleData);
    return turtle;
  } catch (error) {
    throw new Error('Failed to create turtle: ' + error.message);
  }
}

async function updateTurtle(turtleData) {
  try {
    const turtle = await models.Turtles.findByPk(turtleData.id);
    if (!turtle) {
      throw new Error('Turtle not found');
    }

    if (!turtleData.id || !turtleData.name || !turtleData.color) {
      throw new Error('All fields are required');
    }

    await models.Turtles.update(turtleData, { where: { id: turtleData.id } });
    return { message: 'Turtle updated successfully' };
  } catch (error) {
    throw new Error('Failed to update turtle: ' + error.message);
  }
}

async function deleteTurtle(id) {
  try {
    const turtle = await models.Turtles.findByPk(id);
    if (!turtle) {
      throw new Error('Turtle not found');
    }
    await models.Turtles.destroy({ where: { id } });
    return { message: 'Turtle deleted successfully' };
  } catch (error) {
    throw new Error('Failed to delete turtle: ' + error.message);
  }
}

async function bindFavoritePizza(turtleData) {
  try {
    const turtle = await models.Turtles.findByPk(turtleData.turtleId);
    if (!turtle) {
      throw new Error('Turtle not found');
    }

    if (!turtleData.favoritePizzaId) {
      throw new Error('Favorite pizza ID is required');
    }

    await models.Turtles.update({ favoritePizzaId: turtleData.favoritePizzaId }, { where: { id: turtleData.turtleId } });
    return { message: 'Favorite pizza bound successfully' };
  } catch (error) {
    throw new Error('Failed to bind favorite pizza: ' + error.message);
  }
}

async function bindSecondFavoritePizza(turtleData) {
  try {
    const turtle = await models.Turtles.findByPk(turtleData.turtleId);
    if (!turtle) {
      throw new Error('Turtle not found');
    }

    if (!turtleData.secondFavoritePizzaId) {
      throw new Error('Second favorite pizza ID is required');
    }

    await models.Turtles.update({ secondFavoritePizzaId: turtleData.secondFavoritePizzaId }, { where: { id: turtleData.turtleId } });
    return { message: 'Second favorite pizza bound successfully' };
  } catch (error) {
    throw new Error('Failed to bind second favorite pizza: ' + error.message);
  }
}

async function bindWeapon(turtleData) {
  try {
    const turtle = await models.Turtles.findByPk(turtleData.turtleId);
    if (!turtle) {
      throw new Error('Turtle not found');
    }

    if (!turtleData.weaponId) {
      throw new Error('Weapon ID is required');
    }

    await models.Turtles.update({ weaponId: turtleData.weaponId }, { where: { id: turtleData.turtleId } });
    return { message: 'Weapon bound successfully' };
  } catch (error) {
    throw new Error('Failed to bind weapon: ' + error.message);
  }
}

async function unbindFavoritePizza(turtleId) {
  try {
    const turtle = await models.Turtles.findByPk(turtleId);
    if (!turtle) {
      throw new Error('Turtle not found');
    }

    await models.Turtles.update({ favoritePizzaId: null }, { where: { id: turtleId } });
    return { message: 'Favorite pizza unbound successfully' };
  } catch (error) {
    throw new Error('Failed to unbind favorite pizza: ' + error.message);
  }
}

async function unbindSecondFavoritePizza(turtleId) {
  try {
    const turtle = await models.Turtles.findByPk(turtleId);
    if (!turtle) {
      throw new Error('Turtle not found');
    }

    await models.Turtles.update({ secondFavoritePizzaId: null }, { where: { id: turtleId } });
    return { message: 'Second favorite pizza unbound successfully' };
  } catch (error) {
    throw new Error('Failed to unbind second favorite pizza: ' + error.message);
  }
}

async function unbindWeapon(turtleId) {
  try {
    const turtle = await models.Turtles.findByPk(turtleId);
    if (!turtle) {
      throw new Error('Turtle not found');
    }

    await models.Turtles.update({ weaponId: null }, { where: { id: turtleId } });
    return { message: 'Weapon unbound successfully' };
  } catch (error) {
    throw new Error('Failed to unbind weapon: ' + error.message);
  }
}

module.exports = {
  getAllTurtles,
  getTurtleById,
  getTurtlesByFavoriteTurtle,
  createTurtle,
  updateTurtle,
  deleteTurtle,
  bindFavoritePizza,
  bindSecondFavoritePizza,
  bindWeapon,
  unbindFavoritePizza,
  unbindSecondFavoritePizza,
  unbindWeapon,
};