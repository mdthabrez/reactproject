const db = require("../models");
const User = db.user;
const Designation = db.designation;

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  
  exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
  };

  
  exports.getUser = (req,res) => {
    const { username } = req.query;

    User.findOne({
      where: { username },
      attributes: ['username', 'staff_id', 'profile_picture'],
      include: [{ model: Designation, attributes: ['d_name'] }],
    })
      .then(userData => {
        if (!userData) {
          return res.status(404).json({ message: 'User not found' });
        }
        console.log(userData);
        res.status(200).json(userData);
      })
      .catch(error => {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error!' });
      });
  };