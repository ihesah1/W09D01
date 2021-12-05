const userModel = require("./../../db/models/user");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
const SALT = Number(process.env.SALT); //salt مقدار الراندوم فاليوالي بضيفه ع الهاش حقتي


const getUsers = (req, res) => {
  userModel
  .find({})
  .then((result) => {
    res.status(200).json(result);
  })
  .catch((err) => {
    res.status(400).json(err);
  });
};
const removeUser =(req ,res)=>{
  const id = req.params.id;
  console.log(id);
  userModel.findByIdAndDelete(id)
    .then(() => {
      res.status(200).json("user removed");
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
//نسوي الاوثنتكيشن1 
//اول شي نسوي الهاش بالريجستر
const register = async (req, res) => {
    const { email, password, role } = req.body;
    const savedEmail = email.toLowerCase();
    const hashedPassword = await bcrypt.hash(password, SALT);
    
    const newUser = new userModel({
      email: savedEmail,
      password: hashedPassword,
      role
    });
    newUser
      .save()
      .then((result) => {
        res.status(201).json(result);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  };
  // logiiin one user
  const login = (req, res) => {
    const { email, password } = req.body;
    const SECRET_KEY = process.env.SECRET_KEY;
    userModel
      .findOne({ email })
      .then(async (result) => {
        if (result) {
          if (email === result.email) {
            const payload={
              role:result.role
            }
            const options={
              expiresIn: 60*60
            }
            const token = await jwt.sign(payload, SECRET_KEY, options)
            console.log(token);
  
            const unhashPassword = await bcrypt.compare(password, result.password)
  
            if (unhashPassword) {
              res.status(200).json(result, token);
            } else {
              res.status(400).json("invalid email or password");
            }
          } else {
            res.status(400).json("invalid email or password");
          }
        } else {
          res.status(400).json("email not exist");
        }
      })
      .catch((err) => {
        res.status(400).json(err);
      });
    }
    module.exports = {login , register};
