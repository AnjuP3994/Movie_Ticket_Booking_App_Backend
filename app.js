//1. loads .env file - Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env .
require('dotenv').config()

//2. import express (backend create cheyyan express aanu use cheyunath)
const express = require('express')

//3. import cors - connection of two different ports
const cors = require('cors')

//9. import router
const router = require('./Router/routes')

//10. import DB
const db = require('./DB/connection')

//4. create an server application using express
const serverApp = express()

//5. use cors, express and router
serverApp.use(cors())
serverApp.use(express.json())
serverApp.use(router)
serverApp.use('/uploads', express.static('./uploads'))  //to get images from backend to frontend

//6. define port
const PORT = 3003 || process.env.PORT

//7. listening on port
serverApp.listen((PORT),(req,res)=>{
    console.log('listening on port '+PORT);
})

//8. http get resolving to http://localhost:3003
serverApp.get('/',(req,res)=>{
    res.send('Server started...');
})