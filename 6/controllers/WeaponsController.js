const WeaponService = require('../services/WeaponsService');

async function getAllWeapons(req, res) {
  try {
    const weapons = await WeaponService.getAllWeapons();
    res.json(weapons);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function getWeaponsWithDPS(req, res) {
  try {
    const { dps } = req.query;

    if (!dps) {
      res.status(400).json({ message: 'Invalid query' });
      return;
    }

    const [dpsOperator, value] = dps.split(' ');

    if (!['gt', 'lt'].includes(dpsOperator)) {
      res.status(400).json({ message: 'Invalid operator' });
      return;
    }

    const num = parseInt(value);

    if (isNaN(num)) {
      res.status(400).json({ message: 'Invalid value' });
      return;
    }

    if (dpsOperator === 'gt') {
      const weapons = await WeaponService.getWeaponsWithGreaterDPS(num);
      res.json(weapons);
    } else if (dpsOperator === 'lt') {
      const weapons = await WeaponService.getWeaponsWithLowerDPS(num);
      res.json(weapons);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function getWeaponById(req, res) {
  try {
    const weapon = await WeaponService.getWeaponById(req.params.id);
    res.json(weapon);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function createWeapon(req, res) {
  try {
    const newWeapon = await WeaponService.createWeapon(req.body);
    res.status(201).json(newWeapon);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function updateWeapon(req, res) {
  try {
    const updatedWeapon = await WeaponService.updateWeapon(req.body);
    res.json(updatedWeapon);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function deleteWeapon(req, res) {
  try {
    await WeaponService.deleteWeapon(req.params.id);
    res.json({ message: 'Weapon deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  getAllWeapons,
  getWeaponsWithDPS,
  getWeaponById,
  createWeapon,
  updateWeapon,
  deleteWeapon
};
