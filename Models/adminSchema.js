//1. If the models need to connect to MongoDB, it can be done through mongoose. So, create mongoose
const mongoose = require('mongoose');

//2. Create Schema
const adminSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        min:3
    },
    phone:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

//4. export schema
const admin = mongoose.model('admin',adminSchema)

module.exports = admin
