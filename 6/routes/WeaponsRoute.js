const express = require('express');
const router = express.Router();
const WeaponController = require('../controllers/WeaponsController');

router.get('/', async (req, res) => {
  if (req.query.dps) {
    WeaponController.getWeaponsWithDPS(req, res);
  } else {
    WeaponController.getAllWeapons(req, res);
  }
});
router.get('/:id', WeaponController.getWeaponById);

router.post('/', WeaponController.createWeapon);

router.put('/', WeaponController.updateWeapon);

router.delete('/:id', WeaponController.deleteWeapon);

module.exports = router;
