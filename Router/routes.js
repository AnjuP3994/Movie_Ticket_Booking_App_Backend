//1. import express
const express = require('express')

//2. create router object of express to define paths
const router = new express.Router()

//4. import userController 
const userController = require('../Controllers/userController')

//13. import adminController
const adminController = require('../Controllers/adminController')

//19. import movieController
const movieController = require('../Controllers/movieController')

//24. import bookingController
const bookingController = require('../Controllers/bookingController')

//7. import jwtMiddleware
const jwtMiddleware = require('../Middleware/jwtMiddleware')

//18. import validationMiddleware
const { userRegValidator, userLogValidator } = require('../Middleware/validationMiddleware');

//20. import multerMiddleware
const multerConfig = require('../Middleware/multerMiddleware')




// // using router object to define routes(paths)



//User

//5. userRegister API call
router.post('/userRegister', userRegValidator, userController.userRegister)

//6. userLogin API call
router.post('/userLogin', userLogValidator, userController.userLogin)

//7. getUser API call
router.get('/getUser/:id',userController.getUser)

//8. updateUser API call
router.put('/updateUser/:id',userController.updateUser)

//9. getAllUser API call
router.get('/getAllUser',userController.getAllUser)

//10. deleteUser API call
router.delete('/deleteUser/:id',userController.deleteUser)

//11. updateInactiveUser API call
router.put('/inactiveUser/:id',userController.inactiveUser)

//12. updateActiveUser API call
router.put('/activeUser/:id',userController.activeUser)




//Admin

//14. adminRegister API call
router.post('/adminRegister',adminController.adminRegister)

//15. adminLogin API call
router.post('/adminLogin',adminController.adminLogin)

//16. getAdmin API call
router.get('/getAdmin/:id',adminController.getAdmin)

//17. updateAdmin API call
router.put('/updateAdmin/:id',adminController.updateAdmin)




//movies

//21. add movies API call
router.post('/add/movies', jwtMiddleware, multerConfig.single('poster'), movieController.addMovies)

//22. get a movies
router.get("/get/movie/:id", movieController.getAMovie)

//22. get all movies
router.get("/getall/movies", movieController.getAllMovies)

//22. update movies
router.put("/update/movies/:id", jwtMiddleware, movieController.updateMovie)

//22. delete movies
router.delete("/delete/movies/:id", movieController.deleteMovie)

//23. get landing page movies
router.get("/landingpage/movies", movieController.LPMovies)




// //booking

// add new userBooking API call
router.post('/userBooking/:movieId', jwtMiddleware, bookingController.userBooking)

// get viewSeats API call
router.get('/view-seat/:id', bookingController.viewSeats)

// // get viewBookings API call
router.get('/view-bookings', jwtMiddleware, bookingController.viewBooking)





//3. exports router
module.exports = router;