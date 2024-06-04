const express = require('express');
const router = express.Router();
const PizzaController = require('../controllers/PizzasController');

router.get('/', async (req, res) => {
  if (req.query.calories) {
    PizzaController.getPizzasWithCalories(req, res);
  } else {
    PizzaController.getAllPizzas(req, res);
  }
});

router.get('/:id', PizzaController.getPizzaById);

router.get('/transaction/start', PizzaController.addSuperFatToCalorieExceededPizzas);

router.post('/', PizzaController.createPizza);

router.put('/', PizzaController.updatePizza);

router.delete('/:id', PizzaController.deletePizza);

module.exports = router;
