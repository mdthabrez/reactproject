const {sequelize} = require("../config/dbconnection");
const DataTypes = require("sequelize");

const Users = sequelize.define('users', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_email: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    staff_id: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    ph_no: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    profile_picture: {
      type: DataTypes.BLOB,
      allowNull: false
    },
    d_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
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

  Users.sync().then(() => {
      console.log("User Model synced");
    });

  module.exports={Users};
