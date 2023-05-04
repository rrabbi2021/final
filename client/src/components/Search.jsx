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
  const [page, setPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);
  
    movieService.getMovieSearchResults(`${query}?page=${page}`)
      .then((response) => {
        setSearchResults(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        handleNotification(error.response.data.error, 'error');
        console.error(error);
      });
  }, [query, page]);

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

  function decrement() {
    if (page > 1) {
      setPage(page - 1);
    } 
  }
 
  function increment() {
    setPage(prevPage => prevPage + 1);
    console.log('Page:', page + 1);
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
              {searchResults.slice(0, 12).map((movie) => (
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
          <br></br>
      </motion.div>
      {page < 2 ? (
          <div className="pagination-first last-element" style={{display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
            <button onClick={increment} className="btn btn-primary mb-2">Next Page</button>
            {/*<p className='font'>{page}</p>*/}
            {/*<p className='font'>{page}</p>*/}
          </div>
        ) : (
          <div className="pagination-buttons last-element" style={{display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
            <button onClick={decrement} className="btn btn-primary mb-2">Previous Page</button>
            <button onClick={increment} className="btn btn-primary mb-2">Next Page</button>
            {/*<p className='font'>{page}</p>*/}
            {/*<p className='font'>{page}</p>*/}
          </div>
        )}
      </div>
  )
}


export default Search