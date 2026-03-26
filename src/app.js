const express = require("express");

const app = express(); //Creating a server/application instance.

// & Now this more cleaner way to use Middleware for admin authorization.
// & Make Middleware file --> export it to the main file --> use it wherever needed;

const{ adminAuth, userAuth } = require("./middlewares/auth");
app.use("/admin", adminAuth);
app.use("/user", userAuth);

// & I want to write this middleware for all the request which are coming to /admin
// //Handle Auth Middleware for all request GET, POST, PATCH, ....

// app.use("/admin", (req, res, next) => {
//     const token = "xyaaz";
//     const isAdminAuthorized = token === "xyz";
//     if(!isAdminAuthorized) {
//         res.status(401).send("Unauthorized request");
//     } else {
//         next();
//     }
// });

// * another way of using middleware.
app.get("/user", userAuth, (req, res) => {
    res.send("User data sent");
});

// Here we don't need to putrestriction on user to go through authentication. So we will not put user auth middleware here.
app.post("/user/login",(req, res) =>{
    res.send("User logged in successfully");
});

app.post("/user/data", userAuth, (req, res) =>{
    res.send("User data sent");
});

app.get("/admin/getAllData", (req, res) => {
    res.send("All data sent");
});

app.get("/admin/deleteUser", (req, res) => {
    res.send("Deleted a user");
});


 // & If I have to make all the admin API's authorization then in this way i will have to put authorization to    all the admin API's. --> This is not a good way. --> This is where middleware come into picture.

// app.get("/admin/getAllData", (req, res) => {
//     // * Logic of checking if the request is authorized.
//     const token = "xyzkejf";
//     const isAdminAuthorized = token === "xyz";
//     if (isAdminAuthorized) {
//         res.send("All data sent");
//     }
//     else {
//         res.status(401).send("Unauthorized request");
//     }
// });


// app.get("/admin/deleteUser", (req, res) => {
//     // * Logic of checking if the request is authorized.
//     const token = "xyzkejf";
//     const isAdminAuthorized = token === "xyz";
//     if (isAdminAuthorized) {
//         res.send("Delete a user");
//     }
//     else {
//         res.status(401).send("Unauthorized request");
//     }
// });

app.listen(7777,() =>{
    console.log("Server is successfully listening on port 7777...");
});// Listening on port 7777