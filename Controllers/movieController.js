//1. import schema
const movies = require('../Models/movieSchema');


//2. add movies
exports. addMovies = async(req,res)=>{
    console.log("Inside the add project");

    //get image name
    const poster = req.file.filename

    //get add movie details
    const {title, rating, about, hours, type, releaseDate, director, producers, languages} = req.body
    console.log(title, rating, about, hours, type, releaseDate, director, producers, languages, poster);

    //logic of adding new project details
    try {
       const existingMovie = await movies.findOne({title}) 
       if (existingMovie) {
        res.status(406).json("Movie already exists")
       } else {
        const newMovie = new movies({title, rating, about, hours, type, releaseDate, director, producers, languages, poster})
        await newMovie.save()
        res.status(200).json(newMovie)
       }
    } catch (error) {
        // res.status(401).json({"Request Failed": +err})
        console.error("Error adding movie:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}


//3. get a movie (particular movie)
exports.getAMovie = async(req,res)=>{
    const movieId = req.params.id
    try {
        const getamovie = await movies.findOne({_id:movieId})
        res.status(200).json({getamovie})
    } catch (err) {
        console.log('Error get a movie: ',err);
        res.status(401).json({"Request Failed":+err})
    }
}


//3. get all movies 
exports.getAllMovies = async(req,res)=>{
    const searchkey = req.query.search
    // const query = {
    //     language:{
    //         $regex:searchkey, 
    //         $options:"i"
    //     }
    // }
    const query = {
        $or: [
            { title: { $regex: searchkey, $options: "i" } }
        ]
    }
    try {
        const allMovies = await movies.find(query)
        res.status(200).json(allMovies)
    } catch (err) {
        res.status(401).json({"Request Failed":+err})
    }
}


//4. to define updateMovie logic
exports.updateMovie = async(req,res)=>{
    try {
        const movieId = req.params.id;
        const {title, rating, about, hours, type, releaseDate, director, producers, languages} = req.body;
        const updateMovie = await movies.findOne({_id:movieId})
            if (updateMovie) {
                updateMovie.title=title;
                updateMovie.rating=rating;
                updateMovie.about=about;
                updateMovie.hours=hours;
                updateMovie.type=type;
                updateMovie.releaseDate=releaseDate;
                updateMovie.director=director;
                updateMovie.producers=producers;
                updateMovie.languages=languages;
                await updateMovie.save();  //to update the changes in db
                res.status(200).json(updateMovie)
            } else {
                res.status(406).json("Movie not found")
            }
    } catch (error) {
        console.log('Error update movie '+error);
        res.status(500).json("updateMovie API Failed")
    }
}


//5. to define deleteMovie logic
exports.deleteMovie = async(req,res)=>{
    try {
        const movieId = req.params.id;
        const deletemovie = await movies.deleteOne({_id:movieId})
        if (deletemovie) {
            res.status(200).json("Movie deleted successfully.")
        } else {
            res.status(406).json("Movie not found")
        }
    } catch (error) {
        res.status(500).json("deleteMovie API Failed")
    }
}


//6. display movies on Landing page
exports.LPMovies = async(req,res)=>{
    try {
        const lpmovies = await movies.find().limit(4)
        res.status(200).json(lpmovies)
    } catch (err) {
        console.log('Error LPMovies: ', err);
        res.status(401).json({"Request Failed":+err})
    }
}
