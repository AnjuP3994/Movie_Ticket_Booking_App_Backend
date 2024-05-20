//1. If the models need to connect to MongoDB, it can be done through mongoose. So, create mongoose
const mongoose = require('mongoose')


//2. Create schema
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        min:[3]
    },
    phone:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:"active"
    }
})


//3. export schema
const users = mongoose.model('users',userSchema)
module.exports = users