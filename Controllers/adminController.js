//1. import schema
const admin = require('../Models/adminSchema')

//2. import jwt
const jwt = require('jsonwebtoken')

//5. import bcrypt - used for hashing passwords securely.
const bcrypt = require('bcrypt')

//6. define the number of salt rounds for bcrypt
const saltRounds = 10; 


//3. To define adminRegister logic
exports.adminRegister = async(req,res)=>{

    const {username,phone,email,password} = req.body;
    console.log(`adminData: ${username} ${phone} ${email} ${password}`);

    try {
        const existingAdmin = await admin.findOne({email})
        console.log('existingAdmin',existingAdmin); 
        if (existingAdmin) {
            res.status(406).json("Admin already registered")
        }
        else {
            const hashedPassword = await bcrypt.hash(password, saltRounds)  //hash the password before saving to the database
            const newAdmin = await new admin({
                username,
                phone,
                email,
                password: hashedPassword
            })
            await newAdmin.save() //data is saved in db

            //response send to client
            res.status(200).json(newAdmin)
        }
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

//4. To define adminLogin login logic
exports.adminLogin = async(req,res)=>{

    const {email,password} = req.body;
    console.log(`${email} ${password}`);

    try {
        const existingAdmin = await admin.findOne({email})
        if (existingAdmin) {
            const isPasswordValid = await bcrypt.compare(password, existingAdmin.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }
            //Token generation
            const token = jwt.sign({adminId:existingAdmin._id}, "superkey2024")
            res.status(200).json({existingAdmin,token})
        } else {
            //response send to client
            res.status(401).json("Invalid credentials.")
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


//7. to define getAdmin logic
exports.getAdmin = async(req,res)=>{
    try {
        const adminId = req.params.id;
        const getadmin = await admin.findOne({_id:adminId})
        if (getadmin) {
            res.status(200).json({getadmin})
        } else {
            res.status(406).json("Admin not found")
        }
    } catch (error) {
        res.status(500).json("getAdmin API Failed")
    }
}


//8. to define updateAdmin logic
exports.updateAdmin = async(req,res)=>{
    try {
        const adminId = req.params.id;
        const {username,phone,email,password} = req.body;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const updateadmin = await admin.findOne({_id:adminId})
            if (updateadmin) {
                updateadmin.username=username;
                updateadmin.phone=phone;
                updateadmin.email=email;
                updateadmin.password=hashedPassword;
                await updateadmin.save();  //to update the changes in db
                res.status(200).json({updateadmin})
            } else {
                res.status(406).json("Admin not found")
            }
    } catch (error) {
        res.status(500).json("updateAdmin API Failed")
    }
}


