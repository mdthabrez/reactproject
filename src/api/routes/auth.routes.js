

module.exports = app => {

    const authController = require("../controllers/auth.controllers");
    var router = require("express").Router();
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
  
    app.post(
      "/signup",
      
      authController.signup
    );
  
    app.post("/login", authController.Login);

    app.use('/', router);
  }