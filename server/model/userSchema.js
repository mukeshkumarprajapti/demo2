const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({

    userId: {
        type: Number,
        required: true,
         unique: true 
       },
    name: {
        type:String,
        required: true
    }, 

    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    work: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    Otp: {
        type: String,
        
    },
    expireIn: {
        type: Date,
        
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }

    ],
    verifiTokan: {
        type: String
        
    },
    referralCode: {
        type: String,
        unique: true
    },
    referredBy: {
        type: String
        
        
    },
    points: {
        type: Number,
        default: 0
    },
    referredUserId:{
        type: String
    }
    
})

// **we are hashing the password

userSchema.pre('save', async function (next) {
     console.log("hi from inside")
    if(this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next();
});

// we are generating token

userSchema.methods.generateAuthToken = async function (){
    try{
        let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;

    }catch(err){[
        console.log(err)
    ]}
}


const User = mongoose.model('USER', userSchema);

module.exports = User;