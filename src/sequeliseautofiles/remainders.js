const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('remainders', {
    r_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    remainder: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    remainder_deadline: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    circular_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'circular',
        key: 'circular_id'
      }
    }
  }, {
    sequelize,
    tableName: 'remainders',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "remainders_pkey",
        unique: true,
        fields: [
          { name: "r_id" },
        ]
      },
    ]
  });
};
