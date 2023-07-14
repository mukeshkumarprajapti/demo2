const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authenticate = require('../middleware/authenticate');


require("../db/conn");
const User = require("../model/userSchema");

// *****using promises

router.get("/", (req, res) => {
  res.send("Hello world from homepage router");
});

// router.post('/register', (req, res) => {
//     const { name, email, phone, work, password, cpassword} = req.body;

//     if(!name || !email || !phone || !work || !password || !cpassword){
//         return res.status(422).json({error: "plz filled the field property"})
//     }

//     User.findOne({email:email})
//       .then((userExist) => {
//         if(userExist){
//             return res.status(422).json({error: "Email already Exist"});
//         }

//         const user = new User({ name, email,  phone, work, password, cpassword });

//         user.save().then(() => {
//              res.status(201).json({massage: "user registered successfuly"});
//         }).catch((err) =>res.status(500).json({error: "faild to registreed"}))

//       }).catch(err => { console.log(err); });

// });

// ****using async await

router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;

  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: "plz filled the field property" });
  }

  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "Email already Exist" });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "password are not matching" });
    } else {
      const user = new User({ name, email, phone, work, password, cpassword });

      await user.save();

      res.status(201).json({ massage: "user registered successfuly" });
    }
  } catch (err) {
    console.log(err);
  }
});

//  *** login route

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "plz filled the data" });
    }

    const userLogin = await User.findOne({ email: email });

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      const token = await userLogin.generateAuthToken();
      console.log(token);

      res.cookie("jwtoken", token, {
         expires:new Date(Date.now() + 25892000000 ),
         httpOnly:true
        });

      if (!isMatch) {
        res.status(400).json({ error: "Invalid Credientials" });
      } else {
        res.json({ massage: "user Singin Successfully" });
      }
    } else {
      res.status(400).json({ error: "Invalid Credientials" });
    }
  } catch (err) {
    console.log(err);
  }
});


//about us ka page

router.get('/about', authenticate , (req, res) => {
  console.log(`hello my about`);
  res.send(req.rootUser);
});
 
//get user data

router.get('/getdata', authenticate , (req, res) => {
  console.log(`hello my contact`);
  res.send(req.rootUser);
});

//logout us ka page

router.get('/logout', (req, res) => {
  console.log('hello my logout');
  res.clearCookie('jwtoken', {path:'/'})
  res.send(req.rootUser);;
});
 

module.exports = router;
