const express = require ("express");
const requestRouter = express.Router();
const User = require("../models/user");
const { userAuth } = require ('../middlewares/auth');

requestRouter.post("/sendConnectionRequest", userAuth, (req, res) => {
    try{
        const user = req.user;
        console.log("Sending a connection request.");

        res.send(user.firstName + " Sent the connection request");
    }
    catch(err){
        res.status(400).send("ERROR : " + err.message);
    }
})

module.exports = requestRouter;