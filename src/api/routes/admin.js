module.exports = app => {
    const admin = require("../controllers/admin");

    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/create-admin", admin.create);

    app.use('/', router);

};