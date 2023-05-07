var DataTypes = require("sequelize").DataTypes;
var _admin = require("./admin");
var _bonafide = require("./bonafide");
var _circular = require("./circular");
var _course_comp = require("./course_comp");
var _designation = require("./designation");
var _session_data = require("./session_data");
var _users = require("./users");

function initModels(sequelize) {
  var admin = _admin(sequelize, DataTypes);
  var bonafide = _bonafide(sequelize, DataTypes);
  var circular = _circular(sequelize, DataTypes);
  var course_comp = _course_comp(sequelize, DataTypes);
  var designation = _designation(sequelize, DataTypes);
  var session_data = _session_data(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  users.belongsTo(designation, { as: "d", foreignKey: "d_id"});
  designation.hasMany(users, { as: "users", foreignKey: "d_id"});
  session_data.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(session_data, { as: "session_data", foreignKey: "user_id"});

  return {
    admin,
    bonafide,
    circular,
    course_comp,
    designation,
    session_data,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
