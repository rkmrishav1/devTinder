const express = require("express");
const profileRouter = express.Router();
const User = require("../models/user");
const { userAuth } = require ('../middlewares/auth');
const { validateEditProfileData, validateSignUpData, validatePassword } = require ("../utils/validation");
const bcrypt = require ("bcrypt");


profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try{
        const user = req.user;
        res.send(user);
    }
    catch(err){
        res.status(400).send("ERROR : " + err.message);
    }
});


profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        if (!validateEditProfileData(req)){
            throw new Error ("Invalid Edit request!!!");
        }

        const loggedInUser = req.user;
        Object.keys(req.body).forEach((key) => {
            loggedInUser[key] = req.body[key]
        });

        await loggedInUser.save();

        res.json({message : `${ loggedInUser.firstName }, your profile updated successfully.`,
                data : loggedInUser,
        });

    }
    catch (err){
        res.status(400).send("Error : " + err.message);
    }
});

profileRouter.patch("/profile/changePassword", userAuth, async (req, res) => {
    try{
        const { oldPassword, newPassword } = req.body;
        const loggedInUser = req.user;

        const isValid = await bcrypt.compare(
            oldPassword, 
            loggedInUser.password
        );

        if(!isValid){
            throw new Error ("Password Incorrect!!!");
        }

        validatePassword(newPassword);

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        loggedInUser.password = hashedPassword;
        await loggedInUser.save();


        console.log("New Password:", newPassword);
        console.log("Saved Hash:", loggedInUser.password);

        const test = await bcrypt.compare(
            newPassword,
            loggedInUser.password
        );

        console.log("Test Compare:", test);

        res.send("Password Updated successfully");

    } catch (err){
        res.status(400).send("ERROR : " + err.message);
    }
})

module.exports = profileRouter;