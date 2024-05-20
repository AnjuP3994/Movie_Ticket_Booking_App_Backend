// connection of nodejs and mongodb

//1. import mongoose
const mongoose = require('mongoose')

//2. create connection string
const connection_string = process.env.DATABASE

//3. connect with mongoose
mongoose.connect(connection_string).then(()=>{
    console.log('MongoDB connection established...');
}).catch((err)=>{
    console.log('MongoDB connection error '+err);
})