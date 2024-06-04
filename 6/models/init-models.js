var DataTypes = require("sequelize").DataTypes;
var _Pizzas = require("./Pizzas");
var _Turtles = require("./Turtles");
var _Weapons = require("./Weapons");

function initModels(sequelize) {
  var Pizzas = _Pizzas(sequelize, DataTypes);
  var Turtles = _Turtles(sequelize, DataTypes);
  var Weapons = _Weapons(sequelize, DataTypes);

  Turtles.belongsTo(Pizzas, { as: "favoritePizza", foreignKey: "favoritePizzaId"});
  Pizzas.hasMany(Turtles, { as: "Turtles", foreignKey: "favoritePizzaId"});
  Turtles.belongsTo(Pizzas, { as: "secondFavoritePizza", foreignKey: "secondFavoritePizzaId"});
  Pizzas.hasMany(Turtles, { as: "secondFavoritePizza_Turtles", foreignKey: "secondFavoritePizzaId"});
  Turtles.belongsTo(Weapons, { as: "weapon", foreignKey: "weaponId"});
  Weapons.hasMany(Turtles, { as: "Turtles", foreignKey: "weaponId"});

  return {
    Pizzas,
    Turtles,
    Weapons,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
