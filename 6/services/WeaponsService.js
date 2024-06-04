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

async function getAllWeapons() {
  try {
    const weapons = await models.Weapons.findAll();
    return weapons;
  } catch (error) {
    throw new Error('Failed to get all weapons');
  }
}

async function getWeaponById(id) {
  try {
    const weapon = await models.Weapons.findByPk(id);
    return weapon;
  } catch (error) {
    throw new Error('Failed to get weapon by ID');
  }
}

async function getWeaponsWithGreaterDPS(gt) {
  try {
    const weapons = await models.Weapons.findAll({ where: { dps: { [Op.gt]: gt } } });
    return weapons;
  } catch (error) {
    throw new Error('Failed to get weapons with greater DPS');
  }
}

async function getWeaponsWithLowerDPS(lt) {
  try {
    const weapons = await models.Weapons.findAll({ where: { dps: { [Op.lt]: lt } } });
    return weapons;
  } catch (error) {
    throw new Error('Failed to get weapons with lower DPS');
  }
}

async function createWeapon(weaponData) {
  try {
    if (!weaponData.id || !weaponData.dps || !weaponData.name) {
      throw new Error('All fields are required');
    }

    if (weaponData.dps > 500) {
      throw new Error('DPS cannot exceed 500');
    }

    const existingWeapon = await models.Weapons.findByPk(weaponData.id);
    if (existingWeapon) {
      throw new Error('Weapon with this id already exists');
    }

    const weapon = await models.Weapons.create(weaponData);
    return weapon;
  } catch (error) {
    throw new Error('Failed to create weapon: ' + error.message);
  }
}

async function updateWeapon(weaponData) {
  try {
    const weapon = await models.Weapons.findByPk(weaponData.id);
    if (!weapon) {
      throw new Error('Weapon not found');
    }

    if (!weaponData.id || !weaponData.dps || !weaponData.name) {
      throw new Error('All fields are required');
    }

    if (weaponData.dps > 500) {
      throw new Error('DPS cannot exceed 500');
    }

    await models.Weapons.update(weaponData, { where: { id: weaponData.id } });
    return { message: 'Weapon updated successfully' };
  } catch (error) {
    throw new Error('Failed to update weapon: ' + error.message);
  }
}

async function deleteWeapon(id) {
  try {
    const weapon = await models.Weapons.findByPk(id);
    if (!weapon) {
      throw new Error('Weapon not found');
    }
    await models.Weapons.destroy({ where: { id } });
    return { message: 'Weapon deleted successfully' };
  } catch (error) {
    throw new Error('Failed to delete weapon: ' + error.message);
  }
}


module.exports = {
  getAllWeapons,
  getWeaponById,
  getWeaponsWithLowerDPS,
  getWeaponsWithGreaterDPS,
  createWeapon,
  updateWeapon,
  deleteWeapon
};
