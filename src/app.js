const express = require("express");

const app = express(); //Creating a server/application instance.

// app.use("/",(req, res) => {
//     res.end("Namaste Rishav!");
// });

// app.use("/hello/2", (req, res) => {
//     res.end("This is different from the first /hello route!");
// });// --> we will get : response of /hello/2.


// app.use("/hello", (req, res) => {
//     res.end("Hello hello hello!");
// });//Request handler for /hello.

// app.use("/hello/2", (req, res) => {
//     res.end("This is different from the first /hello route!");
// });// --> we will still get : response of /hello.

// * This will only handle GET call to /user
app.get("/user", (req, res) => {
    res.send({firstName : "Rishav", lastName : "Mishra"});
});

app.post("/user", (req, res) => {
    // Saving data to DB.
    res.send("Data saved successfully!");
});

app.delete("/user", (req, res) => {
    // Deleting data from DB.
    res.send("Data deleted successfully!");
});
// * This will match all the HTTP method API calls to /test
app.use("/test", (req, res) => {
    res.end("Hello from the server!");
}); //Request handler

// app.use("/",(req, res) => {
//     res.end("Namaste Rishav!");
// });

app.listen(7777,() =>{
    console.log("Server is successfully listening on port 7777...");
});// Listening on port 7777

//npm i -g nodemon --> automatically refresh the server whenever i will make any changes to my code.