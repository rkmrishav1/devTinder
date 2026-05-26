const express = require("express");
const app = express();
const connectDB = require("./config/database");

const cookieParser = require ("cookie-parser");
const User = require("./models/user");

const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

app.use(cookieParser());
app.use(express.json());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);


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

