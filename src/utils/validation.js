const validator = require("validator");

const validateSignUpData = (req) => {
    const {firstName, lastName, emailId, password} = req.body;// object de-structuring
    
    if (!firstName || !lastName){
        throw new Error ("Please enter valid name :");
    }
    else if (!validator.isEmail(emailId)){
        throw new Error ("Invalid Email");
    }
    else if (!validator.isStrongPassword(password)){
        throw new Error ("Invalid Password");
    }
}

const validateEditProfileData = (req) =>{

    const {firstName, lastName, emailId, photoUrl, about, gender, age, skills} = req.body;


    allowedEditFields = [
        "firstName",
        "lastName",
        "photoUrl",
        "gender",
        "age",
        "about",
        "skills",
    ];
    const isEditAllowed = Object.keys(req.body).every((field) => allowedEditFields.includes(field));

    if (photoUrl && !validator.isURL(photoUrl)){
        throw new Error ("Invalid Photo URL!!!")
    }

    if (about && about.length > 100){
        throw new Error("About should be less than 100 characters")
    }

    if (gender && !["Male", "Female", "Other"].includes(gender)){
        throw new Error ("Invalid Gender!!!")
    }

    if (age && (age) < 18){
        throw new Error ("Age should be greater than 18")
    }

    return isEditAllowed;
}

module.exports = {
    validateEditProfileData,
    validateSignUpData
    
}