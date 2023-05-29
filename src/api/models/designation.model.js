const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('designation', {
    d_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    d_name: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'designation',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "designation_pkey",
        unique: true,
        fields: [
          { name: "d_id" },
        ]
      },
    ]
  });
};
