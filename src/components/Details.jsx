import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import FavoriteButtons from './FavoriteButtons';
import ClipLoader from 'react-spinners/ClipLoader';
import ErrorNotification from './ErrorNotification';
import MessageNotification from './MessageNotification';
import './Details.css';
import { motion } from "framer-motion";
import userService from '../services/user';
import movieService from '../services/movie';
import { Button } from 'react-bootstrap';

const Details = ({ isLoggedIn, error, message, handleNotification }) => {
  const [movie, setMovie] = useState({});
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  let backdropStyle;
  const backdropUrl = 'https://image.tmdb.org/t/p/original/';

  let hours = Math.floor(movie.runtime / 60);
  let remainingMinutes = movie.runtime % 60;

  let timeString = hours.toString() + 'hr ' + remainingMinutes.toString() + 'm';

  useEffect(() => {
    movieService.getMovieDetails(id)
      .then((response) => {
        setMovie(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.error(error);
        handleNotification(error.response.data.error, 'error');
      })

    /*const fetchMovieCredits = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/movie/${id}/credits`);
        setCredits(response.data.crew);
      } catch (error) {
        console.error(error);
        handleNotification(error.response.data.error, 'error');
      }
    };*/

    if (isLoggedIn) {
      userService.checkIfFavorite(id)
        .then((response) => {
          setIsFavorite(response.data.isFavorite);
        })
        .catch((error) => {
          console.log(error);
        })
    }
    setIsLoading(false);
  }, []);

  const handleAddFavorite = (e) => {
    e.preventDefault();
    userService.addFavorite(movie)
      .then((response) => {
        setIsFavorite(true);
        handleNotification(response.data.message, 'message');
        console.log(response);
      })
      .catch((error) => {
        handleNotification(error.response.data.error, 'error');
        console.log(error);
      });
  };

  const handleRemoveFavorite = (e) => {
    e.preventDefault();
    userService.removeFavorite(movie.id)
      .then((response) => {
        setIsFavorite(false);
        handleNotification(response.data.message, 'message');
        console.log(response);
      })
      .catch((error) => {
        handleNotification(error.response.data.error, 'error');
        console.log(error);
      });
  };

  let words = {
    position: 'absolute',
    top: 400,
    bottom: 0,
    right: 0,
    left: 0
  }

    /*if (movie.backdrop_path) {
      backdropStyle = {
        backgroundImage: `url(${backdropUrl}${movie.backdrop_path})`,
        color: 'white',
        height: 'calc(100vh - 66px)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        '::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,

          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1
        }
      }*/

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <ErrorNotification error={error} />
          <ClipLoader 
            loading={isLoading}
            size={150}
          />
        </div>
      </div>
    )
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <div className='text-white'>
      <div>
        {movie.backdrop_path ? <img style={
          { 
            objectFit: 'cover', 
            height: 'calc(100vh - 72px)', 
            width: '100vw',
            zIndex: -100,
            filter: 'blur(12px)'
          }} 
        src={backdropUrl + movie.backdrop_path} alt={movie.name} /> : <></>}
      </div>
      <MessageNotification message={message} />
      <motion.div       
        initial={{ opacity: 0, x: -1000 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        style={words} 
        className='mx-5'
      >
        <h1 style={{ fontSize: '46px', marginBottom: '6rem' }}>{movie.title}</h1>
        
        <p className='pb-2'>{timeString} • {new Date(movie.release_date).toLocaleDateString('en-US', { year: 'numeric' })} • {movie.genres && movie.genres.map((genre) => genre.name).join(", ")}</p>

        
        {isLoggedIn ?
          <div className='d-flex gap-4 pb-2'>
            <Button variant="light" size="lg" className="px-5 py-3" disabled>
              PLAY
            </Button>
            <Button variant="outline-light" size="lg" className="px-4 py-3">
              TRAILER
            </Button>
            <FavoriteButtons movie={movie} isFavorite={isFavorite} handleAddFavorite={handleAddFavorite} handleRemoveFavorite={handleRemoveFavorite} />
          </div>
          : 
          <div className='d-flex gap-4 pb-2'>
            <Button variant="light" size="lg" className="px-5 py-3" disabled>
              PLAY
            </Button>
            <Button variant="outline-light" size="lg" className="px-4 py-3">
              TRAILER
            </Button>
          </div>
        }
  
        <p className='pt-5' style={{ fontSize: '24px', marginRight: '30rem' }}>{movie.overview}</p>
      </motion.div>
    </div>
  )
}

export default Details