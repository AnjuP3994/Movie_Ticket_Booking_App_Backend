//1. If the models need to connect to MongoDB, it can be done through mongoose. So, create mongoose
const mongoose = require('mongoose')


//2. Create schema
const movieSchema = new mongoose.Schema({
    poster:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    rating:{
        type:String,
        required:true
    },
    about:{
        type:String,
        required:true
    },
    hours:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    releaseDate:{
        type:String,
        required:true
    },
    director:{
        type:String,
        required:true
    },
    producers:{
        type:String,
        required:true
    },
    languages:{
        type:String,
        required:true
    }
})


//3. export schema
const movies = mongoose.model('movies',movieSchema)
module.exports = movies