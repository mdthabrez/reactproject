
const {Admin} = require("../models/admin");

exports.create = async(req, res) => {
    //Add validation

    
    // Create a Tutorial
    const admin = {
      admin_id: req.body.admin_id,
      admin_email: req.body.admin_email,
      admin_pwd: req.body.admin_pwd
    };
  
    // Save Tutorial in the database
    Admin.create(admin)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial."
        });
      });
  };

