const express = require("express");

const app = express(); //Creating a server/application instance.

// * work for :- /user?userid=123&name=Rishav&password=123456 (Here each parameter is required) - Query Parameters
app.get("/user", (req, res) => {
    console.log(req.query.userid);
    console.log(req.query);
    res.send({firstName : "Rishav", lastName : "Mishra"});
});

// * work for :- /user/123/Rishav/123456 (Here each parameter is required) - Route Parameters
app.get("/user/:userid/:name/:password", (req, res) => {
    console.log(req.params);
    console.log(req.params.userid);
    console.log(req.params.name);
    console.log(req.params.password);
    res.send({firstName : "Rishav", lastName : "Mishra"});
});


app.listen(7777,() =>{
    console.log("Server is successfully listening on port 7777...");
});// Listening on port 7777

//npm i -g nodemon --> automatically refresh the server whenever i will make any changes to my code.