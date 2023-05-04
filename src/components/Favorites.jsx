import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import ErrorNotification from './ErrorNotification';
import userService from '../services/user';
import poster from '../assets/poster.jpg';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { motion } from "framer-motion";

const Favorites = ({ error, handleNotification}) => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const imgURL = 'https://image.tmdb.org/t/p/w500/';

  useEffect(() => {
    userService.getFavorites()
      .then((response) => {
        setFavoriteMovies(response.data.favorite_movies);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        handleNotification(error.response.data.error, 'error');
      })
  }, []);

  console.log(favoriteMovies)

  if (isLoading) {
    return (
      <>
      
      <div className="d-flex" style={{ justifyContent: 'center', paddingTop: '40vh' }}>
        <ErrorNotification error={error} />
        <ClipLoader 
          loading={isLoading}
          size={150}
        />
      </div>
      </>
    )
  }

  return (
    <>
      <h1 className='pt-4 pb-3 text-center text-white'>Favorites</h1>
      <motion.div       
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <Container>
          <Row xs={1} sm={2} md={3}>
            {favoriteMovies.map((movie) => (
              <Col key={movie.id}>
                <Card className="movie-card" border="dark"> {/* Add CSS class */}
                  <Link to={"/details/" + movie.id}>
                    <Card.Img
                      variant="top"
                      src={movie.backdrop_path ? (imgURL + movie.backdrop_path) : poster}
                      alt={movie.title}
                    />
                    <div className="overlay">
                      <Card.Title>{movie.title}</Card.Title>
                      <Card.Text>{movie.overview.substring(0, 100)}...</Card.Text>
                    </div>
                  </Link>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </motion.div>
    </>
  )
}

export default Favorites