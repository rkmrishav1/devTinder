const express = require("express");
const app = express();
const connectDB = require("./config/database");
const {validateSignUpData} = require ('./utils/validation')
const bcrypt = require ("bcrypt");
const cookieParser = require ("cookie-parser");
const jwt = require("jsonwebtoken");

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

app.get("/profile", async (req, res) => {
    try{
        const cookies = req.cookies;
        const { token } = cookies;

        if (!token) {
            throw new Error ('Invalid Token');
        }

        const decodedMessage = await jwt.verify(token, "Rishav@123");
        const { _id } = decodedMessage;

        const user = await User.findById(_id);

        if (!user){
            throw new Error("User does not exist")
        }
        res.send("Profile data for user: " + user.firstName);

    }
    catch(err){
        res.status(400).send("ERROR : " + err.message);
    }
})

// Get user by email
app.get("/users", async (req, res) => {

    try{
        const userEmail = req.body.emailId;
        const users = await User.findOne({emailId : userEmail});
        if (users.length === 0) {
            res.status(404).send("User not found");
        }
        else{
            res.send(users);
        }
    }
    catch (err){
        res.status(400).send("Something went wrong");
    }
})

// Feed API - GET /feed - get all the users from the Database.
app.get("/feed", async (req, res) => {
    try{
        const users = await User.find({});
        res.send(users);
    }
    catch(err){
        res.status(400).send("Something went wrong");
    }
});

// Delete a user from database
app.delete("/user", async (req, res) => {
    const userId = req.body.userId;
    try{
        const user = await User.findByIdAndDelete({_id : userId});
        // const user = User.findByIdAndDelete(_id);
        res.send("User deleted successfully");
    }
    catch(err){
        res.status(400).send("Something went wrong ");
    }
})

//Update a user in the database
app.patch("/user/:userId", async (req, res) => {
    const userId = req.params?.userId;// we dont want to update the userId but we need userId to update other fields.
    //const userId = req.body.userId;
    const data = req.body;

    try {
        // This is API level validation
        const ALLOWED_UPDATES = ["photoUrl", "password", "about", "gender", "age", "skills"]
        const isUpdateAllowed = Object.keys(data).every((key) => 
            ALLOWED_UPDATES.includes(key)    
        )

        if (!isUpdateAllowed) {
            throw new Error("Update not allowed");
        }
        if (data.skills.length > 10){
            throw new Error("Maximum 10 skills allowed");
        }
        await User.findByIdAndUpdate({_id : userId}, data, {
            returnDocument: "after",
            runValidators : true
        })
        console.log(userId, data);
        res.send("User updated successfully");
    }
    catch(err){
        res.status(400).send("UPDATE FAILED: " + err.message);
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