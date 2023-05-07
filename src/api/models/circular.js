const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('circular', {
    recipient: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    sender: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    circular_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    circular_subject: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    ref_no: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    circular_data: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'circular',
    schema: 'public',
    timestamps: false
  });
};
