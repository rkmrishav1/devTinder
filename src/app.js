const express = require("express");

const app = express(); //Creating a server/application instance.

// app.use("/",(req, res) => {
//     res.end("Namaste from dashboard!");
// });

app.use("/hello", (req, res) => {
    res.end("Hello hello helo!");
});//Request handler for /hello.

app.use("/test", (req, res) => {
    res.end("Hello from the server!");
}); //Request handler

app.listen(7777,() =>{
    console.log("Server is successfully listening on port 7777...");
});// Listening on port 7777

//npm i -g nodemon --> automatically refresh the server whenever i will make any changes to my code.