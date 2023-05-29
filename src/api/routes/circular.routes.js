const { authJwt } = require("../middleware");
const controller = require("../controllers/circular.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/addcircular",
  controller.createCircular)

  app.post("/api/getallcircular",
  controller.getAllCircular)
}