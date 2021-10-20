const express = require('express');
const db = require('./../models');
const Genre = db.genres;
const UserGenre = db.user_genres;

const newGenre = async function(req, res) {
    let checkGenre = await Genre.findOne({where:{name: req.body.name, is_active:1}});
    if(checkGenre){
      res.status(405).json({message:"Genre Already Available"});
    }
    else{
      let createGenre = await Genre.create({
          name: req.body.name
      });
      res.status(200).json({
          success: true,
          details: createGenre
      });
    }
}

const getAllGenre = async function(req, res) {
    let getGenre: any = await Genre.findAll({
        where: {
            is_active: 1
        },
        attributes: ['id', 'name', 'is_active']
    });
    res.status(200).json({
        details: getGenre
    });
}

const setFavoriteGenre = async function(req, res) {
    let user_id = res.locals.user.user_id;
    if (!req.body.genre_id) {
        res.status(400).send('Parameters are missing or invalid');
    }
    let checkGenre = await Genre.findOne({
        where: {
            id: req.body.genre_id,
            is_active: 1
        }
    });
    if (checkGenre) {
        let setFavorite = await UserGenre.create({
            user_id: user_id,
            genre_id: req.body.genre_id
        });
        res.status(200).json({
            message: "Favorite Genre Added"
        });
    } else {
        res.status(404).json({
            message: "Genre Not Found!"
        });
    }
}

const getUserFavoriteGenre = async function(req, res) {
    let user_id = res.locals.user.user_id;
    let getGenreIds = await UserGenre.findAll({
        where: {
            user_id: user_id,
            is_active: 1
        },
        attributes: ['genre_id']
    });
    let genre_id = getGenreIds.map(x => x.genre_id);
    let getGenres = await Genre.findAll({
        where: {
            id: genre_id,
            is_active: 1
        },
        attributes: ['id', 'name', 'is_active']
    });
    res.status(200).json({
        details: getGenres
    });
}

module.exports = {
    newGenre: newGenre,
    getAllGenre: getAllGenre,
    setFavoriteGenre: setFavoriteGenre,
    getUserFavoriteGenre: getUserFavoriteGenre
}
