const express = require('express');
const router = express.Router();
const TurtleController = require('../controllers/TurtlesController');

router.get('/', async (req, res) => {
  if (req.query.favoritePizza) {
    TurtleController.getTurtlesByFavoritePizza(req, res);
  } else {
    TurtleController.getAllTurtles(req, res);
  }
});

router.get('/:id', TurtleController.getTurtleById);

router.post('/', TurtleController.createTurtle);

router.put('/', TurtleController.updateTurtle);
router.put('/favoritePizzaBind', TurtleController.bindFavoritePizza);
router.put('/secondFavoritePizzaBind', TurtleController.bindSecondFavoritePizza);
router.put('/weaponBind', TurtleController.bindWeapon);

router.delete('/:id/favoritePizzaUnbind', TurtleController.unbindFavoritePizza);
router.delete('/:id/secondFavoritePizzaUnbind', TurtleController.unbindSecondFavoritePizza);
router.delete('/:id/weaponUnbind', TurtleController.unbindWeapon);
router.delete('/:id', TurtleController.deleteTurtle);

module.exports = router;
