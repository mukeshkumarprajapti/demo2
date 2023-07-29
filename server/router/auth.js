const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const randomstring = require("randomstring")
const authenticate = require('../middleware/authenticate');


require("../db/conn");
const User = require("../model/userSchema");
const Otp = require("../model/otpSchema");
 const transporter = require("../emailSend/transporter");
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
 

router.post('/forgetpassword', async (req, res) => {
  const { email } = req.body;

  if (!email ) {
    return res.status(404).json({ error: "plz filled the data" });
  }

  try{
  

    const Data = await User.findOne({ email: email });

    const token = randomstring.generate();
  


    const setusertoken = await User.findByIdAndUpdate({_id:Data._id},{verifiTokan:token},{new:true});

    if(setusertoken){
      const mailOption = {
            from:'prajaptimukesh770@gmail.com', 
            to:email,
            subject: "sending Email for password reset",
            text: `This Link Valid For 1 MINUTES http://localhost:5173/forgetpassword/${Data._id}/${setusertoken.verifiTokan} `
           
          }

          transporter.sendMail(mailOption,(error, info)=>{
            if(error){
              console.log("error", error);
              res.status(401).json({status:201, massage: "email not sent"})
            }else{
              console.log("Email sent", info.response);
              res.status(201).json({status:201, massage: "email  sent successfully"})
          }
    })
  }

  }catch (error) {
    res.status(401).json({status:401, massage: "Invalid user"})
  }
})

//verify user for forget password

router.get("/forgetpassword/:id/:token", async (req, res) => {
  const {id, token} = req.params;
  try{
    const validuser = await User.findOne({_id:id, verifiTokan:token});

    // const verifytoken = jwt.verify(token, process.env.SECRET_KEY);

    // console.log(verifytoken)

    if(validuser){
      res.status(201).json({status:201, validuser})
    }else{
      res.status(401).json({status:401, message:"user not exist"})
    }

  }catch(error){
    res.status(401).json({status:401, error:"token not find"})
  }
})


//change password

router.post("/:id/:token", async (req, res) => {
  const {id, token} = req.params;

  const {password} = req.body;

  try{
    const validuser = await User.findOne({_id:id, verifiTokan:token});

    if(validuser ){
       const newPassword = await bcrypt.hash(password, 12);

       const setnewPassword = await User.findByIdAndUpdate({_id:id}, {password:newPassword});
        

       setnewPassword.save();

      res.status(201).json({status:201, setnewPassword})
    }else{
      res.status(401).json({status:401, message:"user not exist"})
    }

  }catch(error){
    res.status(401).json({status:401, error})
  }
})


module.exports = router;
