import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ErrorNotification from './ErrorNotification';
import MessageNotification from './MessageNotification';
import { Form, Button, Card, Container } from 'react-bootstrap';
import './Login.css'; // Import CSS file
import userService from '../services/user';
import { motion } from "framer-motion";
import { FaGoogle } from 'react-icons/fa';

const Login = ({ setUser, setIsLoggedIn, message, error, handleNotification }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    userService.login({
      email: email,
      password: password
    })
    .then(response => {
      console.log(response);
      setUser({
        uid: response.data.user.uid,
        email: response.data.user.email
      });
      setIsLoggedIn(true);
      navigate('/');
    })
    .catch(error => {
      handleNotification(error.response.data, 'error');
      console.log(error);
    });
  };

  const handleGoogleLogin = (e) => {
    e.preventDefault();
    userService.googleLogin()
    .then(response => {
      console.log(response);
      navigate('/');
    })
    .catch(error => {
      console.log(error);
    });
  };

  return (
    <Container className='d-flex justify-content-center' style={{ paddingTop: '30vh' }}>
      <ErrorNotification error={error} />
      <MessageNotification message={message} />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <Card className='shadow-lg bg-dark' style={{ width: '30rem' }}>
          <Card.Body>
            <div className='mb-5 font-center'>
              <h3>Log In</h3>
              <p>New to Movie Fair? <Link to="/register">Create an Account</Link></p>
            </div>
            <Form onSubmit={handleLogin}>
              <Form.Group controlId="formBasicEmail" className='mb-4'>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  size="lg"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword" className='mb-5'>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  size="lg"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </Form.Group>
              <div className="d-grid">
                <Button variant="primary" size="lg" className="p-3 mb-3" type="submit" style={{ fontSize: '0.9rem', letterSpacing: '0.2rem', borderRadius: '25px'}}>
                  LOG IN
                </Button>
                <Button variant="outline-primary" size="lg" className="p-3 mb-3" onClick={handleGoogleLogin} style={{ fontSize: '0.9rem', letterSpacing: '0.2rem', borderRadius: '25px'}}>
                  <FaGoogle /> LOG IN WITH GOOGLE
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </motion.div>
    </Container>
  );
};

export default Login;