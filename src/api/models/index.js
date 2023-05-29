const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);
db.designation = require("./designation.model.js")(sequelize,Sequelize);
db.refreshToken = require("../models/refreshToken.model.js")(sequelize, Sequelize);
db.bonafide = require("./bonafide.model.js")(sequelize, Sequelize);
db.circular = require("./circular.model.js")(sequelize, Sequelize);
db.remainders = require("./remainders.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.refreshToken.belongsTo(db.user, {
  foreignKey: 'userId', targetKey: 'id'
});
db.user.hasOne(db.refreshToken, {
  foreignKey: 'userId', targetKey: 'id'
});

db.remainders.belongsTo(db.circular, { as: "circular", foreignKey: "circular_id"});
db.circular.hasMany(db.remainders, { as: "remainders", foreignKey: "circular_id"});
db.user.belongsTo(db.designation, {  foreignKey: "d_id"});
db.designation.hasMany(db.user, {  foreignKey: "d_id"});
db.circular.belongsTo(db.user, { as: "user", foreignKey: "user_id"});
db.user.hasMany(db.circular, { as: "circulars", foreignKey: "user_id"});
db.remainders.belongsTo(db.user, { as: "user", foreignKey: "user_id"});
db.user.hasMany(db.remainders, { as: "remainders", foreignKey: "user_id"});


db.ROLES = ["user", "admin", "moderator"];

module.exports = db;