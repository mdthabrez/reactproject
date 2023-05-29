var DataTypes = require("sequelize").DataTypes;
var _admin = require("./admin");
var _bonafide = require("./bonafide");
var _circular = require("./circular");
var _course_comp = require("./course_comp");
var _designation = require("./designation");
var _remainders = require("./remainders");
var _session_data = require("./session_data");
var _temporary_circular = require("./temporary_circular");
var _users = require("./users");

function initModels(sequelize) {
  var admin = _admin(sequelize, DataTypes);
  var bonafide = _bonafide(sequelize, DataTypes);
  var circular = _circular(sequelize, DataTypes);
  var course_comp = _course_comp(sequelize, DataTypes);
  var designation = _designation(sequelize, DataTypes);
  var remainders = _remainders(sequelize, DataTypes);
  var session_data = _session_data(sequelize, DataTypes);
  var temporary_circular = _temporary_circular(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  remainders.belongsTo(circular, { as: "circular", foreignKey: "circular_id"});
  circular.hasMany(remainders, { as: "remainders", foreignKey: "circular_id"});
  users.belongsTo(designation, { as: "d", foreignKey: "d_id"});
  designation.hasMany(users, { as: "users", foreignKey: "d_id"});
  circular.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(circular, { as: "circulars", foreignKey: "user_id"});
  remainders.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(remainders, { as: "remainders", foreignKey: "user_id"});
  session_data.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(session_data, { as: "session_data", foreignKey: "user_id"});

  return {
    admin,
    bonafide,
    circular,
    course_comp,
    designation,
    remainders,
    session_data,
    temporary_circular,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
