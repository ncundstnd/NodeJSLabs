const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Weapons', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    dps: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
  }, {
    sequelize,
    tableName: 'Weapons',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "Weapons_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
