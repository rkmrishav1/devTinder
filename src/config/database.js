const mongoose = require("mongoose");

const connectDB = async() => {
    await mongoose.connect("mongodb+srv://rkrishavmishra_db_user:c1yCrGcRLGttXtVl@namastenodejs.lnya0vm.mongodb.net/devTinder");
}

module.exports = connectDB;
