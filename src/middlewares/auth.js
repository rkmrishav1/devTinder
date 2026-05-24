const jwt = require('jsonwebtoken');
const User = require("../models/user");

const userAuth = async (req, res, next) => {
    try{
        // Read the token from the req cookies.
        const { token } = req.cookies;
        if (!token){
            throw new Error('Token is not valid !!!!!!!');
        }

        //Validate the token.
        const decodedObj = await jwt.verify(token, "Rishav@123");
        const { _id } = decodedObj;// Getting the id from decodedObj.
        
        // Find the user.
        const user = await User.findById(_id);
        if (!user){
            throw new Error("User not Found!!!")
        }
        req.user = user; // Attach this user to my request object.
        next();
    }
    catch(err){
        res.status(400).send("ERROR : " + err.message);
    }


}

module.exports ={
    userAuth,
};
