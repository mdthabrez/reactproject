const {sequelize} = require("../config/dbconnection");


const testDbConnection = require("../config/dbconnection");
const DataTypes = require("sequelize");

testDbConnection.testDbConnection();

const Admin = sequelize.define("admin", {
    admin_id: {
      
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    admin_email: {
      type: DataTypes.STRING,
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

  Admin.sync().then(() => {
      console.log("Admin Model synced");
    });

  module.exports={Admin};
