const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('circular', {
    recipient: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    sender: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    circular_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    circular_subject: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    ref_no: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    circular_data: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    circular_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'circular',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "circular_pkey",
        unique: true,
        fields: [
          { name: "circular_id" },
        ]
      },
    ]
  });
};
