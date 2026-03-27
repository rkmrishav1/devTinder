
//Handle Auth Middleware for all request GET, POST, PATCH,....

const adminAuth = (req, res, next) => {
    console.log("Admin auth is getting checked!!");
    const token = "xyz";
    const isAdminAuthorized = token === "xyz";
    if(!isAdminAuthorized) {
        res.status(401).send("Unauthorized request");
    } else {
        next();
    }
};

const userAuth = (req, res, next) => {
    const token = "abc";
    const isUserAutherized = token === "abc";

    if(isUserAutherized){
        next();
    }
    else{
        res.status(401).send("User UnAuthorized");
    }
};

module.exports ={
    adminAuth,
    userAuth
};
