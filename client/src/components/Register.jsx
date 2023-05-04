import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ErrorNotification from './ErrorNotification';
import userService from '../services/user';
import { Form, Button, Card, Container } from 'react-bootstrap';
import { motion } from "framer-motion";

const Register = ({ error, handleNotification }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const navigate = useNavigate();

  const handleRegistration = (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      userService.register({
        email: email,
        password: password
      })
      .then(response => {
        console.log(response);
        handleNotification('Successfully created user. You may now log in.', 'message');
        navigate('/login');
      })
      .catch(error => {
        console.log(error);
        handleNotification(error.response.data, 'error');
      })
    } else {
      handleNotification('Passwords do not match.', 'error');
    }
  }

  return (
    <Container className='d-flex justify-content-center' style={{ paddingTop: '27vh' }}>
      <ErrorNotification error={error} />
      <motion.div       
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <Card className='shadow-lg bg-dark' style={{ width: '60rem' }}>
          <Card.Body>
            <div className='mb-5 font-center'>
              <h3>Create an Account</h3>
              <p>Already have an Account? <Link to="/login">Log In</Link></p>
            </div>
            <Form onSubmit={handleRegistration}>
              <Form.Group controlId="formBasicEmail" className='mb-4'>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  size="lg"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword" className='mb-4'>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  size="lg"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicRepeatPassword" className='mb-5'>
                <Form.Control
                  type="password"
                  placeholder="Repeat Password"
                  size="lg"
                  value={repeatPassword}
                  onChange={(event) => setRepeatPassword(event.target.value)}
                />
              </Form.Group>
              <div className="d-grid">
                <Button variant="primary" size="lg" className="p-3 mb-3" type="submit" style={{ fontSize: '0.9rem', letterSpacing: '0.2rem', borderRadius: '25px'}}>
                  REGISTER
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </motion.div>
  </Container>
  )
}


export default Register
