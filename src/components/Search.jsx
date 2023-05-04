import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';
import ErrorNotification from './ErrorNotification';
import './Search.css'
import movieService from '../services/movie';
import poster from '../assets/poster.jpg';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { motion } from "framer-motion";

const Search = ({ error, handleNotification }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { query } = useParams();
  const imgURL = 'https://image.tmdb.org/t/p/w500/';

  useEffect(() => {
    setIsLoading(true);
    movieService.getMovieSearchResults(query)
      .then((response) => {
        setSearchResults(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        handleNotification(error.response.data.error, 'error');
      })
  }, [query]);

  if (isLoading) {
    return (
      <div className="d-flex" style={{ justifyContent: 'center', paddingTop: '40vh' }}>
        <ErrorNotification error={error} />
        <ClipLoader 
          loading={isLoading}
          size={150}
        />
      </div>
    )
  }

  return (
      <div className='bg'>
        <h2 className="pt-4 pb-3 font-center">Search results : {query}</h2>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Container>
            <Row xs={1} sm={2} md={3}>
              {searchResults.map((movie) => (
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
      </div>
  )
}

export default Search