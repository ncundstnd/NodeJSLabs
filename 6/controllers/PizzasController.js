const PizzaService = require('../services/PizzasService');

async function getAllPizzas(req, res) {
  try {
    const pizzas = await PizzaService.getAllPizzas();
    res.json(pizzas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function getPizzasWithCalories(req, res) {
  try {
    const { calories } = req.query;

    if (!calories) {
      res.status(400).json({ message: 'Invalid query' });
      return;
    }

    const [caloryOperator, value] = calories.split(' ');

    if (!['gt', 'lt'].includes(caloryOperator)) {
      res.status(400).json({ message: 'Invalid operator' });
      return;
    }

    const num = parseInt(value);

    if (isNaN(num)) {
      res.status(400).json({ message: 'Invalid value' });
      return;
    }

    if (caloryOperator === 'gt') {
      const pizzas = await PizzaService.getPizzasWithGreaterCalories(num);
      res.json(pizzas);
    } else if (caloryOperator === 'lt') {
      const pizzas = await PizzaService.getPizzasWithLowerCalories(num);
      res.json(pizzas);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function getPizzaById(req, res) {
  try {
    const pizza = await PizzaService.getPizzaById(req.params.id);
    res.json(pizza);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function createPizza(req, res) {
  try {
    const newPizza = await PizzaService.createPizza(req.body);
    res.status(201).json(newPizza);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function updatePizza(req, res) {
  try {
    const updatedPizza = await PizzaService.updatePizza(req.body);
    res.json(updatedPizza);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function deletePizza(req, res) {
  try {
    await PizzaService.deletePizza(req.params.id);
    res.json({ message: 'Pizza deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function addSuperFatToCalorieExceededPizzas(req, res) {
  try {
    await PizzaService.addSuperFatToCalorieExceededPizzas();
    res.json({ message: 'Transaction ended' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  getAllPizzas,
  getPizzasWithCalories,
  getPizzaById,
  createPizza,
  updatePizza,
  deletePizza,
  addSuperFatToCalorieExceededPizzas
};
