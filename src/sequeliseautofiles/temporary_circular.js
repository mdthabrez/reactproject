const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('temporary_circular', {
    temp_cname: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    temp_c_data: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'temporary_circular',
    schema: 'public',
    timestamps: false
  });
};
