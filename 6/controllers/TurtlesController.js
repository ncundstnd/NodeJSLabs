const TurtleService = require('../services/TurtlesService');

async function getAllTurtles(req, res) {
  try {
    const turtles = await TurtleService.getAllTurtles();
    res.json(turtles);
  } catch (err) {
    res.status(500).json({ message: `Failed to get all turtles` });
  }
}

async function getTurtlesByFavoritePizza(req, res) {
  try {
    const turtles = await TurtleService.getTurtlesByFavoriteTurtle(req.query.favoritePizza);
    res.json(turtles);
  } catch (err) {
    res.status(500).json({ message: `Failed to get all turtles` });
  }
}

async function getTurtleById(req, res) {
  try {
    const turtle = await TurtleService.getTurtleById(req.params.id);
    res.json(turtle);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function createTurtle(req, res) {
  try {
    const newTurtle = await TurtleService.createTurtle(req.body);
    res.status(201).json(newTurtle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function updateTurtle(req, res) {
  try {
    const updatedTurtle = await TurtleService.updateTurtle(req.body);
    res.json(updatedTurtle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function bindFavoritePizza(req, res) {
  try {
    const updatedTurtle = await TurtleService.bindFavoritePizza(req.body);
    res.json(updatedTurtle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function bindSecondFavoritePizza(req, res) {
  try {
    const updatedTurtle = await TurtleService.bindSecondFavoritePizza(req.body);
    res.json(updatedTurtle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function bindWeapon(req, res) {
  try {
    const updatedTurtle = await TurtleService.bindWeapon(req.body);
    res.json(updatedTurtle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function unbindFavoritePizza(req, res) {
  try {
    const updatedTurtle = await TurtleService.unbindFavoritePizza(req.params.id);
    res.json(updatedTurtle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function unbindSecondFavoritePizza(req, res) {
  try {
    const updatedTurtle = await TurtleService.unbindSecondFavoritePizza(req.params.id);
    res.json(updatedTurtle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function unbindWeapon(req, res) {
  try {
    const updatedTurtle = await TurtleService.unbindWeapon(req.params.id);
    res.json(updatedTurtle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function deleteTurtle(req, res) {
  try {
    await TurtleService.deleteTurtle(req.params.id);
    res.json({ message: 'Turtle deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  getAllTurtles,
  getTurtlesByFavoritePizza,
  getTurtleById,
  createTurtle,
  updateTurtle,
  bindFavoritePizza,
  bindSecondFavoritePizza,
  bindWeapon,
  unbindFavoritePizza,
  unbindSecondFavoritePizza,
  unbindWeapon,
  deleteTurtle
};
