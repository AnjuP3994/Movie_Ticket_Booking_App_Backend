//1. import schema
const booking = require('../Models/bookingSchema')
const movies = require('../Models/movieSchema')


//2. To define userBooking logic
exports.userBooking = async (req, res) => {
    const { seatNo } = req.body
    const { movieId } = req.params
    const id = req.payload  // userId
    // Check if seatNo is provided
    if (!seatNo) {
        return res.status(400).json({ msg: "Seat number is required." });
    }
    try {
        // Check if the user has already booked this movie
        const existingUserBookings = await booking.findOne({ userId: id });
        console.log(existingUserBookings);
        if (existingUserBookings.length > 0) {
            const moviesBooked = existingUserBookings.map(booking => booking.movieId);
            if (moviesBooked.includes(movieId)) {
                return res.status(400).json({ msg: "Booking the same movie again is not possible." });
            }
        }
        // Check if the seat number is already booked for this movie
        const existingSeatBooking = await booking.findOne({ movieId, seatNo });
        if (existingSeatBooking) {
            return res.status(400).json({ msg: "Seat number already booked for this movie." });
        }
        // Create a new booking
        const newBooking = new booking({ userId: id, movieId, seatNo });
        await newBooking.save();
        return res.status(200).json({ msg: "Booked Successfully", data:newBooking});
    }
    catch (err) {
        return res.status(401).json(`Add booking API failed: ${err}`);
    }
}



//3. To define viewSeats logic
exports.viewSeats = async (req, res) => {
    const { id } = req.params
    try {
        const existingBookings = await booking.find({ movieId: id });
        console.log(existingBookings);
        if (existingBookings.length > 0) {
            const seatNumbers = existingBookings.map(i => i.seatNo);
            return res.status(200).json(seatNumbers);
        }
        else {
            return res.status(200).json({ msg: "no reserverseats" });
        }
    }
    catch (err) {
        return res.status(401).json(`seat view API failed: ${err}`);
    }

}


//4. To define view user bookings logic 
exports.viewBooking = async (req, res) => {
    const  id  = req.payload    //movieId
    try {
        const existingBookings = await booking.find({ userId: id });
        if (existingBookings.length > 0) {
            const bookingsWithMovieNames = [];
            for (const bookingItem of existingBookings) {
                const movie = await movies.findById(bookingItem.movieId); // Fetching movie details based on movieId
                if (movie) {
                    bookingsWithMovieNames.push({
                        movieName: movie.title, 
                        seatNumbers: bookingItem.seatNum 
                    });
                }
            }
            console.log(bookingsWithMovieNames);
            return res.status(200).json(bookingsWithMovieNames);
        } else {
            return res.status(200).json({ msg: "No Bookings" });
        }
    } catch (err) {
        return res.status(401).json(`User booking view API failed: ${err}`);
    } 
}