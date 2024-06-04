const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Turtles', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    color: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    weaponId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Weapons',
        key: 'id'
      }
    },
    favoritePizzaId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Pizzas',
        key: 'id'
      }
    },
    secondFavoritePizzaId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Pizzas',
        key: 'id'
      }
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true
    },
  }, {
    sequelize,
    tableName: 'Turtles',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "Turtles_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
