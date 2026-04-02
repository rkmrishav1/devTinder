const mongoose = require("mongoose");

// Schema is the identity for that collection.It tells whaat are the information about the user are we storing.
const userSchema = new mongoose.Schema({
    firstName : {
        type : String
    },
    lastName : {
        type : String
    },
    emailId : {
        type : String
    },
    password : {
        type : String
    },
    age : {
        type : Number
    },
    gender : {
        type : String
    }
})

const user = mongoose.model("user", userSchema);
// Model is like a class it creates its own instances(object of a class).

module.exports = user;