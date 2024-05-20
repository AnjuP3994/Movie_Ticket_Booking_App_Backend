//1. import schema
const users = require('../Models/userSchema')

//6. import jwt
const jwt = require('jsonwebtoken')

//4. import bcrypt - used for hashing passwords securely.
const bcrypt = require('bcrypt')

//5. define the number of salt rounds for bcrypt
const saltRounds = 10; 


//2. To define register logic
exports.userRegister = async(req,res)=>{
    console.log("Inside the register function");

    const {username,phone,email,password} = req.body;
    console.log(`userData: ${username} ${phone} ${email} ${password}`);

    try {
        const existingUser = await users.findOne({email})
        console.log('existingUser',existingUser); 
        if (existingUser) {
            res.status(406).json("User already registered")
        }
        else {
            const hashedPassword = await bcrypt.hash(password, saltRounds)  //hash the password before saving to the database
            const newUser = await new users({
                username,
                phone,
                email,
                password: hashedPassword
            })
            await newUser.save() //data is saved in db

            //response send to client
            res.status(200).json(newUser)
        }
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}


//3. To define login logic
exports.userLogin = async(req,res)=>{
    
    console.log("Inside the login function");

    const {email,password} = req.body;
    console.log(`${email} ${password}`);

    try {
        const existingUser = await users.findOne({email})
        if (existingUser) {
            const isPasswordValid = await bcrypt.compare(password, existingUser.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }
            //Token generation
            const token = jwt.sign({userId:existingUser._id}, "superkey2024")
            res.status(200).json({existingUser,token})
        } else {
            //response send to client
            res.status(401).json("Invalid credentials.")
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

//7. to define getUser logic
exports.getUser = async(req,res)=>{
    try {
        const userId = req.params.id;
        const getuser = await users.findOne({_id: userId})
        if (getuser) {
            res.status(200).json({getuser})
        } else {
            res.status(406).json("User not found")
        }
    } catch (error) {
        res.status(500).json("getUser API Failed")
    }
}

//8. to define getAllUser logic
exports.getAllUser = async(req,res)=>{
    try {
        const getalluser = await users.find()
        if (getalluser) {
            res.status(200).json({getalluser})
        } else {
            res.status(406).json("No such user found.")
        }
    } catch (error) {
        res.status(500).json("getAllUser API Failed")
    }
}

//9. to define updateUser logic
exports.updateUser = async(req,res)=>{
    try {
        const userId = req.params.id;
        const {username,email,phone,password} = req.body;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const updateuser = await users.findOne({_id:userId})
            if (updateuser) {
                updateuser.username=username;
                updateuser.email=email;
                updateuser.phone=phone;
                updateuser.password=hashedPassword;
                await updateuser.save();  //to update the changes in db
                res.status(200).json({updateuser})
            } else {
                res.status(406).json("User not found")
            }
    } catch (error) {
        res.status(500).json("updateUser API Failed")
    }
}

//10. to define deleteUser logic
exports.deleteUser = async(req,res)=>{
    try {
        const userId = req.params.id;
        const deleteuser = await users.deleteOne({_id:userId})
        if (deleteuser) {
            res.status(200).json("User deleted successfully.")
        } else {
            res.status(406).json("User not found")
        }
    } catch (error) {
        res.status(500).json("deleteUser API Failed")
    }
}


//11. to define inactiveUser logic
exports.inactiveUser = async(req,res)=>{
    try {
        const userId = req.params.id;
        // const {status} = "inactive";
        const updateInactiveUser = await users.findOne({_id:userId})
        if (updateInactiveUser) {
            updateInactiveUser.status="inactive";
            await updateInactiveUser.save();
            res.status(200).json({updateInactiveUser})
        } else {
            res.status(406).json("User not found")
        }
    } catch (error) {
        res.status(500).json("updateInactiveUser API Failed")
    }
}

//12. to define activeUser logic
exports.activeUser = async(req,res)=>{
    try {
        const userId = req.params.id;
        const {status} = req.body;
        const updateActiveUser = await users.findOne({_id:userId})
        if (updateActiveUser) {
            updateActiveUser.status=status;
            await updateActiveUser.save();
            res.status(200).json({updateActiveUser})
        } else {
            res.status(406).json("User not found")
        }
    } catch (error) {
        res.status(500).json("updateActiveUser API Failed")
    }
}