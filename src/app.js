const express = require("express");
const app = express();
const connectDB = require("./config/database");

const User = require("./models/user");

const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

app.post("/signup", async (req, res) => {
    // const userObj = {
    //     firstName : "Rishav",
    //     lastName : "Mishra",
    //     emailID : "rkrishavmishra@gmail.com",
    //     password : "hello@1234",
    // }
    //const user = new User(userObj);
    const user = new User({
        firstName : "Virat",
        lastName : "Kohli",
        emailId : "viratkohli@gmail.com",
        password : "virat@1234",
    });

    try{
        await user.save()
        res.send("User added Successfully...");
    }
    catch(err){
        res.status(400).send("Error in saving the user :", + err.message);
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