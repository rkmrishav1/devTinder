const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema(
    {
        fromUserId : {
            type : mongoose.Schema.Types.ObjectId,
            required : true
        },

        toUserId : {
            type : mongoose.Schema.Types.ObjectId,
            required : true
        },

        status : {
            type : String,
            required : true,
            enum : ["ignored", "interested", "rejected", "accepted"],
            message : `{VALUE} is incorrect status type`
        }
    }
);
// This is a kind of middleware. it will be called everytime the connection request will be saved.That is way name is pre -> pre-save.
connectionRequestSchema.pre("save", function () {
    const connectionRequest = this

    // Check if fromUserId is same as toUserId
    if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error ("Cannot send request to yourself!");
    }
    
})

const ConnectionRequest = mongoose.model('ConnectionRequest', connectionRequestSchema);

module.exports = ConnectionRequest;