const express = require("express");
const app = express();
const connectDB = require("./config/database");

const User = require("./models/user");

const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

app.use(express.json()); // Parse JSON request bodies. It is a middleware
// & This express.json middleware will read the json object, it will convert it into a JavaScript object and will add it to the req.body. Now i can read this body, get the data

app.post("/signup", async (req, res) => {
    
    const user = new User(req.body);// & now req.body is 
    // const userObj = {
    //     firstName : "Rishav",
    //     lastName : "Mishra",
    //     emailID : "rkrishavmishra@gmail.com",
    //     password : "hello@1234",
    // }
    console.log(req.body);
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