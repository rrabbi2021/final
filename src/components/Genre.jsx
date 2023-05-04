import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from 'react-router-dom';
import movieService from '../services/movie';

const Genre = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const noPosterImg = '../assets/poster.png';
  const imgURL = 'https://image.tmdb.org/t/p/w500/';

  // This is a useState for deciding which genre id to use for Genre.jsx's useEffect function
  // the plan is to copy most of Home.jsx for Genre.jsx

  const [chosenGenreId, setChosenGenreId] = useState(37); //28 is "Action"

  function genreSetter(number) {

    setChosenGenreId(number);

  }

  //const noPosterImg = '';

  useEffect(() => {
    setIsLoading(true);
    movieService.getMoviesByGenre(chosenGenreId)
      .then((response) => {
        setMovies(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      })
  }, [chosenGenreId]);

  console.log(movies);


  if (isLoading) {
    return (
      <div className="d-flex" style={{ justifyContent: 'center', paddingTop: '40vh' }}>
        <ClipLoader 
          loading={isLoading}
          size={150}
        />
      </div>
    )
  }

  return (
    <>
      <div>
	    <div>

        <button onClick={ () => genreSetter(28) }>Action</button>
        <button onClick={ () => genreSetter(35) }>Comedy</button>
        <button onClick={ () => genreSetter(9648) }>Mystery</button>
        <button onClick={ () => genreSetter(878) }>Science Fiction</button>
        <button onClick={ () => genreSetter(37) }>Western</button>
		  
        </div>
  
		
        {movies.map((movie) => (
          <div key={movie.id}>
            <h2>{movie.title}</h2>
            <Link to={"/details/" + movie.id} ><img src={movie.poster_path ? (imgURL + movie.poster_path) : noPosterImg} alt={movie.title} /></Link>
            <p>{movie.overview}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default Genre