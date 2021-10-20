const express = require('express');
const db = require('./../models');

const User = db.users;
const Movie = db.movies;
const UserReview = db.user_reviews;

const getAllUsers = async function(req, res) {
    let getUsers = await User.findAll();
    res.send(getUsers);
}

const addReview = async function(req, res) {
    let user_id = res.locals.user.user_id;
    let getMovie:any = {};
    if (!req.body.movie_id || !req.body.review) {
        res.status(400).send('Parameters are missing or invalid');
    }
    let newReview = await UserReview.create({
        user_id: user_id,
        movie_id: req.body.movie_id,
        reviews: req.body.review
    });
    getMovie = await Movie.findOne({
        where: {
            id: req.body.movie_id,
            is_active: 1
        },
        attributes: ['id', 'user_id', 'genre_id', 'name', 'description', 'release_date', 'upvote', 'downvote', 'is_active'],
        raw: true
    });
    getMovie['reviews'] = newReview.reviews;
    getMovie['review_added_user'] = newReview.user_id;
    res.status(200).json({
        message: "Your Review Added."
    });
}


module.exports = {
    getAllUsers: getAllUsers,
    addReview: addReview,
}
