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
    // try{
    //     const userEmail = req.body.emailId;
    //     const users = await User.find({emailId : userEmail});
    //     if (users.length === 0){
    //         res.status(404).send("User not found");
    //     }
    //     else{
    //         res.send(users);
    //     }
    // }
    // catch(err){
    //     res.status(400).send("Something went wrong");
    // }
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

// Update a user in the database
// app.patch("/user", async (req, res) => {
//     const userId = req.body.userId;
//     const data = req.body;

//     try {
//         await User.findByIdAndUpdate({_id : userId}, data, {
//             returnDocument: "before"
//         })
//         console.log(userId, data);
//         res.send("User updated successfully");
//     }
//     catch(err){
//         res.status(400).send("Something went wrong");
//     }
// })

// Update a user by emailId in the database
app.patch("/user", async (req, res) => {
    // findOneAndUpdate(filter, update, options) 
    const emailId = req.body.emailId;
    const data = req.body;
    try {
        const user = await User.findOneAndUpdate({emailId : emailId}, data, {
            returnDocument: "after"
        });
        console.log(emailId, data);
        res.send(user);
    }
    catch(err){
        res.status(400).send("Something went wrong");
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