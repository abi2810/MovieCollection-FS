const express = require('express');
const db = require('./../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;
const User = db.users;
const Genre = db.genres;
const Movie = db.movies;
const Voting = db.votings;
const UserReview = db.user_reviews;
const UserGenre = db.user_genres;

const getOneMovie = async function(id) {
    let getMovie = await Movie.findOne({
        where: {
            id: id,
            is_active: 1
        },
        attributes: ['id', 'user_id', 'genre_id', 'genre_name', 'name', 'description', 'release_date', 'upvote', 'downvote'],
        raw: true
    });
    return getMovie;
}

const addMovie = async function(req, res) {
    let user_id = res.locals.user.user_id;
    if ((!req.body.name) && (!req.body.genre_id) && (!req.body.release_date)) {
        res.status(400).send('Parameters are missing or invalid');
    }
    let checkMovie = await Movie.findOne({where:{name: req.body.name,is_active:1}});
    if(checkMovie){
      res.status(405).send({message:"Movie Already Available"});
    }
    let getGenre = await Genre.findOne({
        where: {
            id: req.body.genre_id,
            is_active: 1
        },
        attributes: ['id', 'name']
    });
    let newMovie = await Movie.create({
            name: req.body.name,
            description: req.body.description,
            user_id: user_id,
            genre_id: req.body.genre_id,
            genre_name: getGenre.name,
            release_date: req.body.release_date
        }).then(async function(movie) {
            if (movie) {
                res.status(200).json({
                    details: movie
                });
            } else {
                res.status(500).send({
                    error: 'Movie not added'
                });
            }
        })
        .catch(error => {
            res.status(500).send({
                error: error
            });
        })
}

const setVotings = async function(req, res) {
    let updateCount;
    let user_id = res.locals.user.user_id;
    if (!req.body.movie_id || !req.body.vote) {
        res.status(400).send('Parameters are missing or invalid');
    }
    let checkMovie = await Movie.findOne({
        where: {
            id: req.body.movie_id,
            is_active: 1
        }
    });
    if (checkMovie) {
        let checkUserVote = await Voting.findOne({
            where: {
                user_id: user_id,
                movie_id: req.body.movie_id,
                is_active: 1
            }
        });
        if (!checkUserVote) {
            //Create new
            let newVote = await Voting.create({
                user_id: user_id,
                movie_id: req.body.movie_id,
                is_vote: req.body.vote
            });
            if (req.body.vote == 1) {
                updateCount = await Movie.update({
                    upvote: checkMovie.upvote + 1
                }, {
                    where: {
                        id: req.body.movie_id,
                        is_active: 1
                    }
                });
            } else {
                updateCount = await Movie.update({
                    downvote: checkMovie.downvote + 1
                }, {
                    where: {
                        id: req.body.movie_id,
                        is_active: 1
                    }
                });
            }
            res.status(200).json({
                message: "Your Vote is added."
            })
        } else {
            //Update Vote and Count
            if (checkUserVote.is_vote == req.body.vote) {
                res.status(405).json({
                    message: "Already Voted"
                });
            } else {
                let editVote = await Voting.update({
                    is_vote: req.body.vote
                }, {
                    where: {
                        movie_id: req.body.movie_id,
                        is_active: 1
                    }
                });
                if (req.body.vote == 1) {
                    updateCount = await Movie.update({
                        upvote: checkMovie.upvote + 1,
                        downvote: checkMovie.downvote - 1
                    }, {
                        where: {
                            id: req.body.movie_id,
                            is_active: 1
                        }
                    });
                } else {
                    updateCount = await Movie.update({
                        upvote: checkMovie.upvote - 1,
                        downvote: checkMovie.downvote + 1
                    }, {
                        where: {
                            id: req.body.movie_id,
                            is_active: 1
                        }
                    });
                }
                res.status(200).json({
                    message: "Your Vote is updated."
                })
            }
        }
    }
}

const getMovieDetails = async function(req, res) {
    let getMovie = {};
    if (!req.params.movie_id) {
        res.status(400).send('Parameters are missing or invalid');
    }
    getMovie = await getOneMovie(req.params.movie_id);
    if (!getMovie) {
        res.status(404).send({
            message: "Movie Not Found"
        })
    }
    let getReview = await UserReview.findAll({
        where: {
            movie_id: req.params.movie_id,
            is_active: 1
        },
        attributes: ['user_id', 'reviews']
    });
    getMovie['reviews'] = getReview;
    res.status(200).json({
        details: getMovie
    });
}

const getRecomendedMovies = async function(req, res) {
    let movieArr = [];
    let page = 0;
    let limit = 5;
    let user_id = res.locals.user.user_id

    if (req.query.limit) {
        limit = Number(req.query.limit);
    }

    if (req.query.page) {
        page = ((req.query.page - 1) * limit);
    }

    let getGenreIds = await UserGenre.findAll({
        where: {
            user_id: user_id,
            is_active: 1
        },
        attributes: ['genre_id']
    });
    let genre_id = getGenreIds.map(x => x.genre_id);
    let getMoviesByGenreId = await Movie.findAll({
        where: {
            genre_id: genre_id,
            is_active: 1
        },
        offset: page,
        limit: limit,
        order: [
            ['upvote', 'DESC'],
            ['release_date', 'DESC'],
        ],
        attributes: ['id', 'genre_name', 'name', 'description', 'release_date', 'upvote', 'downvote']
    });
    res.send({
        movie_list: getMoviesByGenreId
    });
}

const getAllMovies = async function(req, res) {

    let page = 0
    let limit = 5
    let search = '';
    let votes = 0;

    if (req.query.limit) {
        limit = Number(req.query.limit);
    }

    if (req.query.page) {
        page = ((req.query.page - 1) * limit);
    }

    if (req.query.search) {
        search = req.query.search;
    }

    if (req.query.votes) {
        votes = Number(req.query.votes);
    }

    let getMoviesByGenreId = await Movie.findAll({
        where: {
            is_active: 1,
            upvote: {
                [Op.gte]: votes
            },
            [Op.or]: [{
                    name: {
                        [Op.like]: '%' + search + '%'
                    },
                },
                {
                    genre_name: {
                        [Op.like]: '%' + search + '%'
                    }
                }
            ]
        },
        offset: page,
        limit: limit,
        subQuery: false,
        order: [
            ['upvote', 'DESC'],
            ['release_date', 'DESC'],
        ],
        attributes: ['id', 'genre_name', 'name', 'description', 'release_date', 'upvote', 'downvote']
    });
    res.send({
        movie_list: getMoviesByGenreId
    });
}

module.exports = {
    addMovie: addMovie,
    getAllMovies: getAllMovies,
    setVotings: setVotings,
    getMovieDetails: getMovieDetails,
    getRecomendedMovies: getRecomendedMovies
}
