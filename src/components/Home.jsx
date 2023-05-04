import './Home.css'; // Import CSS file
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import poster from '../assets/poster.jpg';
import ErrorNotification from './ErrorNotification';
import movieService from '../services/movie';

const Home = ({ error, handleNotification }) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const imgURL = 'https://image.tmdb.org/t/p/w500/';

  const [page, setPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);

    movieService.getPopularMovies(page)
      .then((response) => {
        setMovies(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        handleNotification(error.response.data.error, 'error');
        console.error(error);
      })

  }, [page]);

  function decrement() {
    if (page > 1) {
      setPage(page - 1);
    } 
  }
 
  function increment() {
    setPage(page + 1);
  }

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
    <>
      <div className='bg'>
        <br></br>
        {page === 1 && <h1 className="font-center">Top 12 Movies</h1>}
        <br></br>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Container>
            <Row xs={1} sm={2} md={3}>
              {movies.slice(0, 12).map((movie) => (
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
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        {page < 2 ? (
          <div className="pagination-first last-element" style={{diplay: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
            <button onClick={decrement} className="btn btn-primary mb-2">Previous Page</button>
            <button onClick={increment} className="btn btn-primary mb-2">Next Page</button>
            {/*<p className='font'>{page}</p>*/}
            {/*<p className='font'>{page}</p>*/}
          </div>
        ) : (
          <div className="pagination-buttons last-element" style={{diplay: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
            <button onClick={decrement} className="btn btn-primary">Previous Page</button>
            <button onClick={increment} className="btn btn-primary">Next Page</button>
            {/*<p className='font'>{page}</p>*/}
            {/*<p className='font'>{page}</p>*/}
          </div>
        )}
      </div>
    </>
  );
  
}

export default Home;