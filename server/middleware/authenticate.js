const jwt = require('jsonwebtoken');
const User = require("../model/userSchema");


const authenticate = async (req, res, next) => {
   try {
     const token = req.cookies.jwtoken;
     if (!token) {
      throw new Error('Authentication token missing.');
    }

     const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
     console.log(verifyToken);

     const rootUser = await User.findOne({
        _id:verifyToken._id, "tokens.token":token
     });

     if (!rootUser) {throw new Error("User not found.") }

     req.token = token;
     req.rootUser = rootUser;
     req.UserID =rootUser._id;
     req.user = rootUser;
     next();


   }catch (err){
    res.status(401).send('Unauthorize No token provided');
    console.log(err);
   }
}

module.exports = authenticate;