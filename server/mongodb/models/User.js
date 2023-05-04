const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    uid: String,
    favorite_movies: [{
        id: Number,
        title: String,
        overview: String,
        poster_path: String,
        backdrop_path: String
    }]
});

module.exports = mongoose.model('User', userSchema)