const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_email: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    username: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    staff_id: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    ph_no: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    profile_picture: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    d_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'designation',
        key: 'd_id'
      }
    }
  }, {
    sequelize,
    tableName: 'users',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "users_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
