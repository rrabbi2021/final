const axios = require('axios');
const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const router = express.Router();
const API_KEY = process.env.API_KEY;

// GETS POPULAR MOVIES
router.get('/', async (req, res) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`);
    const movies = response.data.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      poster_path: movie.poster_path,
      genre_ids: movie.genre_ids,
      release_date: movie.release_date,
    }));
    res.status(200).json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching movies.' });
  }
});

// GETS GENRE REAL
router.get('/genre/:id', async (req, res) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${req.params.id}`);
    const movies = response.data.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      poster_path: movie.poster_path,
      backdrop_path: movie.backdrop_path,
      genre_ids: movie.genre_ids,
      release_date: movie.release_date,
    }));
    res.status(200).json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// GET POPULAR MOVIES BY PAGE
router.get('/:page', async (req, res) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${req.params.page}`);

    const movies = response.data.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      poster_path: movie.poster_path,
      backdrop_path: movie.backdrop_path,
      genre_ids: movie.genre_ids,
      release_date: movie.release_date,
    }));
    res.status(200).json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching movies.' });
  }
});

// GETS SPECIFIC MOVIE BY ID
router.get('/details/:id', async (req, res) => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${req.params.id}?api_key=${API_KEY}`);
      const movie = response.data;
      res.status(200).json(movie);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching movies.' });
    }
});

// GETS SEARCH RESULTS BY QUERY
router.get('/search/:query', async (req, res) => {
    const search = req.params.query;

    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${search}`);
      const movies = response.data.results.map((movie) => ({
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        poster_path: movie.poster_path,
        backdrop_path: movie.backdrop_path,
        genre_ids: movie.genre_ids,
        release_date: movie.release_date,
      }));
      res.status(200).json(movies);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching search results.' });
    }
});

module.exports = router;