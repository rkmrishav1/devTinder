const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require ("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        minLength : 3,
        maxLength : 100
    },
    lastName : {
        type : String,
        minLength : 3,
        maxLength : 100
    },
    emailId : {
        type : String, 
        required : true,
        trim : true,
        unique : true,
        lowercase : true,
        // validate(value){
        //     if (!validator.isEmail(value)){
        //         throw new Error ("Invalid Email address " + value);
        //     }
        // }
    },
    password : {
        type : String,
        required : true,
        // validate(value){
        //     if (!validator.isStrongPassword(value)){
        //         throw new Error ("Enter a strong password : " + value);
        //     }
        // }
    },
    age : {
        type : Number,
        min : 18
    },
    gender : {
        type : String,
        // by default this validate method will only be called when this new document is created.If I am trying to patch an existing data then it won't work by default we will have to enable it explicitly.
        validate(value){
            if(!["Male", "Female", "Other"].includes(value)){
                throw new Error("Invalid gender");
            }
        }
    },
    photoUrl : {
        type : String,
        default : "https://vidhilegalpolicy.in/wp-content/uploads/2025/04/iStock-1481741599.jpg",
        validate(value){
            if (!validator.isURL(value)){
                throw new Error ("Invalid URL " + value);
            }
        }
    },
    about : {
        type : String,
        maxLength : 500,
        default : "This is about the user."
    },
    skills : {
        type : [String]
    }
},{
    timestamps : true
}
)

userSchema.methods.getJWT = async function (){
    const user = this;

    const token = await jwt.sign({ _id : user._id}, 'Rishav@123', {expiresIn : '7d'});

    return token;
}

userSchema.methods.validatePassword = async function (passwordInputByUser){
    const user = this;
    const passwordHash = user.password;
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);
    return isPasswordValid;
}
const user = mongoose.model("user", userSchema);

module.exports = user;