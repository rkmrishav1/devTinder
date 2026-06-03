const  express = require ("express");
const authRouter = express.Router();
const { validateSignUpData } = require ('../utils/validation');
const bcrypt = require ("bcrypt");
const User = require("../models/user");

authRouter.post("/signup", async (req, res) => {
    try{
        // & Before creating a new user we must follow these steps:->
    // 1.) Validate the input data because NEVER TRUST req.body(because client can send any malicious data).
        validateSignUpData(req);

        const {firstName, lastName, emailId, password} = req.body;
    // 2.) Encrypt the password before saving it to the database.
        const passwordHash = await bcrypt.hash(password, 10);
        
    // 3.) Create the user in the database.
        const user = new User({
            firstName,
            lastName,
            emailId,
            password : passwordHash,// Save encrypted password.
            }
        );
        await user.save()
        res.send("User added Successfully...");
    }
    catch(err){
        res.status(400).send("ERROR :" + err.message);
    }
})

authRouter.post("/login", async (req, res) => {
    try{
        const {emailId, password} = req.body;
        const user = await User.findOne({emailId : emailId})
        if (!user){
            throw new Error ("Invalid credentials");
        }
        const isPasswordValid = await user.validatePassword(password);
        if (isPasswordValid){
            // Create a JWT token 
            const token = await user.getJWT();
            // Add the token to cookie and send response back to the user 
            //res.cookie("token", token, { Expires : new Date (Date.now() + 0 * 3600000)});
            res.cookie("token", token);
            res.send("Login Successful....");
        }
        else{
            throw new Error ("Invalid credentials !!!")
        }
    }
    catch(err){
        res.status(400).send("ERROR : " + err.message);
    }
})

authRouter.post("/logout", async (req, res) => {
    res.cookie("token", null, {expires : new Date (Date.now())});
    res.json("Logged out successfully");
})

module.exports = authRouter;