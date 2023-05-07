
const {Users} = require("../models/users");
const bcrypt = require("bcrypt");
const {jwtDetails }= require("../config/config")
const jwt = require("jsonwebtoken");



exports.signup = async(req, res) => {
    //Add validation

    
    // Create a User
    const user = {
      
      user_email: req.body.user_email,
      password: bcrypt.hashSync(req.body.password, 8),
      username: req.body.username,
      staff_id: req.body.staff_id,
      ph_no:req.body.ph_no,
      profile_picture:req.body.profile_picture,
      d_id:req.body.d_id
    };
    console.log(user);
    // Save User in the database
    Users.create(user)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial."
        });
      })
};




exports.Login = async (req, res) => {
    // const role = req.locals.role
   
    const mailId = req.body.user_email;
    const password = req.body.password;
    console.log(req.body);
   console.log(mailId);
   console.log(password);
    try {
        if (mailId && password) {
            let data = await Users.findOne({
                where: {
                    user_email: mailId
                }
            })
            console.log(data);
            if (data === null) {
                
                return res.status(401).send({ message: "Mail ID is not registered yet" })

            }

            await bcrypt.compare(password, data.password, function (err, result) {
                if (err) {
                    console.error(err);
                    return res.status(401).send({ message: "Server Error" })
                }
                else {
                    if (result === true) {
                        const id = data.dataValues.id

                        var token = jwt.sign({ id }, jwtDetails.secret, {
                            expiresIn: jwtDetails.jwtExpiration
                        });
                        // testing set JWT;
                        res.set("x-access-token",token);
                        return res.status(200).json({ message: "Login Success", accessToken: token })
                    }
                    else {
                        return res.status(401).send({ message: "Wrong Password" })
                    }
                }
            });

        }
        else {
            return res.status(400).send({ message: "Invalid Data" })
        }
    }
    catch (err) {
        console.error(err);
        return res.status(500).send({ message: "server error" });
    }
}



