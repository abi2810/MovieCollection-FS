const express = require('express');
const authenticatedRouter = express.Router();

const user = require('../controllers/user-controller');
const movie = require('../controllers/movie-controller');
const genre = require('../controllers/genre-controller');

//Users
authenticatedRouter.get('/userAll',user.getAllUsers);
authenticatedRouter.post('/review',user.addReview);

//Movie Routes
authenticatedRouter.post('/movie',movie.addMovie);
authenticatedRouter.get('/allMovies',movie.getAllMovies);
authenticatedRouter.post('/vote',movie.setVotings);
authenticatedRouter.get('/movie/:movie_id',movie.getMovieDetails);
authenticatedRouter.get('/movieRecommendation',movie.getRecomendedMovies);


//Genre Routes
authenticatedRouter.post('/favoriteGenre',genre.setFavoriteGenre);
authenticatedRouter.get('/favoriteGenre',genre.getUserFavoriteGenre);


module.exports = authenticatedRouter;
