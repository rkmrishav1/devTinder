const express = require("express");
const app = express();

app.get("/getUserData", (req, res) => {
    // try{
        //Logic of DB call and get user data
        throw new Error("Error occurred while fetching user data");
        res.send("User data sent");
    // }
    // catch(error){
    //     res.status(500).send("Some Error occurred contact support team");
    // }

});

// always call the error handling middleware at the end of the code.
app.use("/",(err, rq, res, next) =>{
    if (err) {
        console.error(err);
        res.status(500).send("Something went wrong");
    }
});

app.listen(7777,() => {
    console.log("Server is continuously listening on port 7777...")
})