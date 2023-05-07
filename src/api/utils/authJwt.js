const jwt = require("jsonwebtoken");
const {jwtDetails} = require("../config/config.js");


const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  console.log(jwtDetails.secret);
  jwt.verify(token, jwtDetails.secret, (err, decoded) => {
    if (err) {
        console.error(err);
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};


const authJwt = {
  verifyToken: verifyToken,
};
module.exports = {authJwt};