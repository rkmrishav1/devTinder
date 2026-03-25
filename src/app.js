const express = require("express");

const app = express(); //Creating a server/application instance.

// GET/ user => It checks all the app.xxx (matching route) functions.

// If you are sending a request to the express server. It will try to go one by one check all these methods(use, get) if it finds its matchings it will call that function and it will keep on going one after the other to these route handlers and middlewares till it reaches the function which actually sends the response back and actually that function is known as request handler.
app.use("/", (req, res, next) => {
    //res.send("Handling / route");
    next();
});

app.get("/user", (req, res, next) => {
    //res.send("Handling /user route");
    next();
},(req, res, next) => {
    next();
},(req, res, next) => {
    res.send("2nd Route Handler");
});


app.listen(7777,() =>{
    console.log("Server is successfully listening on port 7777...");
});// Listening on port 7777

//npm i -g nodemon --> automatically refresh the server whenever i will make any changes to my code.