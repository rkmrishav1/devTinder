const express = require ("express");
const requestRouter = express.Router();
const User = require("../models/user");
const { userAuth } = require ('../middlewares/auth');
const ConnectionRequest = require ('../models/connectionRequest');

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => { // we have to keep status as dynamic because here status can be either interested or ignored.

    // ! Issues : 1) If i send requests(interested) to someone and at the same time he also sends me the request.
    // !          2) If i send the request more than once then there will be duplicates in the database
    // !          3) should not send request to itself
                

    try{
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedStatus = ["interested", "ignored"];

        if(!allowedStatus.includes(status)){
            return res.status(400).json({
                message : 'Invalid status type ' + status
            });
        }

        const toUser = await User.findById(toUserId);
        if (!toUser) {
            return res.status(404).json({ message: "User not found!" });
        }

        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [
                {fromUserId, toUserId},
                {fromUserId : toUserId, toUserId : fromUserId}
            ]
        });

        if(existingConnectionRequest){
            return res.status(400).json({
                message : `Connection already exists!!!`
            })
        }

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        });

        const data = await connectionRequest.save();

        res.json({
            message : req.user.firstName + "is" + status + "in" + toUser.firstName,
            data
        });
    }
    catch(err){
        res.status(400).send("ERROR : " + err.message);
    }
})

module.exports = requestRouter;