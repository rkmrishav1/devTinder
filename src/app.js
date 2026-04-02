const express = require("express");
const app = express();
const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const connectDB = require("./config/database");

connectDB()
    .then(() => {
        console.log("Database connected Succesfully...");
        app.listen(7777, () =>{
            console.log("Server is continuiously listening on Port 7777...")
        })
    })
    .catch((err) => {
        console.log("Database cannot be connected!!!", err);
    })



// Note : First connect to the Database and then listen to the request.