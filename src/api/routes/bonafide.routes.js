const controller = require("../controllers/bonafide.controller");
const { authJwt } = require("../middleware");
const fs = require('fs');
const handlebars = require('handlebars');
const path = require('path');
const puppeteer = require('puppeteer'); 


module.exports = function(app) {
    // app.use(function(req, res, next) {
    //     res.header(
    //       "Access-Control-Allow-Headers",
    //       "x-access-token, Origin, Content-Type, Accept"
    //     );
    //     next();
    //   });

      app.post("/api/addbonafide",
      
        controller.createBonafide);

      app.get("/api/getbonafide" ,
      controller.getAll);

      
      app.post("/api/getbonafide/filter",
      controller.getBonafidefilter
      )

      app.get("/api/pdf/:filename",
      controller.getBonafideFilename)
};