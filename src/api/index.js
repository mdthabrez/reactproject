const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const Admin = require("./models/admin");
const router = express.Router();
var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

const fs = require('fs');
const handlebars = require('handlebars');
const path = require('path');
const puppeteer = require('puppeteer');

require("./routes/admin")(app);
require("./routes/user.routes")(app);
require("./routes/auth.routes")(app);
require("./routes/bonafide.routes")(app);
require("./routes/circular.routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const db = require("./models");
const Role = db.role;
const desig = db.designation;



db.sequelize.sync().then(() => {
  console.log('Drop and Resync Db');
});




