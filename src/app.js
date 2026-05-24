const express = require("express");
const app = express();
const connectDB = require("./config/database");
const {validateSignUpData} = require ('./utils/validation')
const bcrypt = require ("bcrypt");
const cookieParser = require ("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require ('./middlewares/auth');
const User = require("./models/user");

const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

app.use(cookieParser());
app.use(express.json());

app.post("/signup", async (req, res) => {
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

app.post("/login", async (req, res) => {
    try{
        const {emailId, password} = req.body;
        const user = await User.findOne({emailId : emailId})
        if (!user){
            throw new Error ("Invalid credentials");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid){
            // Create a JWT token 
            const token = await jwt.sign({_id : user._id}, "Rishav@123");
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

app.get("/profile", userAuth, async (req, res) => {
    try{
        const user = req.user;
        res.send(user);
    }
    catch(err){
        res.status(400).send("ERROR : " + err.message);
    }
})

app.post("/sendConnectionRequest", userAuth, (req, res) => {
    try{
        const user = req.user;
        console.log("Sending a connection request.");

        res.send(user.firstName + " Sent the connection request");
    }
    catch(err){
        res.status(400).send("ERROR : " + err.message);
    }
})

connectDB()
    .then(() => {
        console.log("Database connected Succesfully...");
        app.listen(7777, ()=> {
            console.log("Server is continuiously listening on Port 7777..");
        });
    })
    .catch((err) => {
        console.log("Database cannot be connected!!!", err)
    })

// Note : First connect to the Database and then listen to the request.