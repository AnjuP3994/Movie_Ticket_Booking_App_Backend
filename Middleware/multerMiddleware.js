//1. import multer
const multer = require('multer')

//2. to store multer data
const storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'./uploads')
    },
    //create a new file name
    filename:(req,file,callback)=>{
        const filename = `image-${Date.now()}-${file.originalname}`
        callback(null,filename)
    }
})

//3. filter
const fileFilter = (req,file,callback)=>{
    if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
        callback(null,true)
    }
    else {
        callback(null,false)
        return callback(new Error("Invalid file type... must be png, jpg, jpeg"))
    }
}

//4. export storage and fileFilter
const multerConfig = multer({
    storage, fileFilter
})
module.exports = multerConfig
