const express = require('express');
const publicRouter = express.Router();

const genre = require('../controllers/genre-controller');
const auth = require('../controllers/auth-controller');
const user = require('../controllers/user-controller');
const movie = require('../controllers/movie-controller');

publicRouter.post('/genre', genre.newGenre);
publicRouter.get('/allGenres', genre.getAllGenre);
publicRouter.post('/register', auth.signup);
publicRouter.post('/login', auth.login);

publicRouter.get('/allMovies', movie.getAllMovies);

module.exports = publicRouter;
