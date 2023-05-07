

module.exports = app => {
    const { authJwt } = require("../utils/authJwt");
    const usercontroller = require("../controllers/users.controller");

    var router = require("express").Router();
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", usercontroller.allAccess);

  app.get(
    "/api/test/user",
    authJwt.verifyToken,
    usercontroller.userBoard
  );


  app.use('/', router);
};