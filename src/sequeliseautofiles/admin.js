const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('admin', {
    admin_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    admin_email: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    admin_pwd: {
      type: DataTypes.CHAR(25),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'admin',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "admin_pkey",
        unique: true,
        fields: [
          { name: "admin_id" },
        ]
      },
    ]
  });
};
