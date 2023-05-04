import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Container, Form, FormControl, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const NavigationBar = ({ user, handleLogout }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search/${query}`);
  }

  return (
    <Navbar className='shadow' style={{ zIndex: 900 }} bg="dark" variant="dark" expand="lg">
      <Container className='p-2'>
        <Navbar.Brand as={Link} to="/">Movie Fair</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="me-auto mb-2 mb-lg-0">
            <Form onSubmit={handleSearch} className="d-flex">
              <FormControl type="search" placeholder="Search" style={{ marginRight: '1rem', borderRadius: '25px', border: 'none'}} aria-label="Search" onChange={(e) => setQuery(e.target.value)} required />
              <Button variant="outline-success" type="submit" style={{ borderRadius: '25px'}}>Search</Button>
            </Form>
          </Nav>
          <Nav>
            {user.uid ? (
              <>
                <div className="nav-link">
                  {user.email}
                </div>
                <Button as={Link} to="/favorites" variant="primary" size="lg" style={{ fontWeight: 'bold', fontSize: '0.8rem', marginRight: '0.7rem', paddingLeft: '1.5rem', paddingRight: '1.5rem', borderRadius: '25px'}}>
                  Favorites
                </Button>
                <Button variant="danger" size="lg" onClick={handleLogout} style={{ fontWeight: 'bold', fontSize: '0.8rem', marginRight: '0.7rem', paddingLeft: '1.5rem', paddingRight: '1.5rem', borderRadius: '25px'}}>
                  Log Out
                </Button>
              </>
            ) : (
              <>
              <Button variant="primary" size="lg" as={Link} to="/login" style={{ fontWeight: 'bold', fontSize: '0.8rem', marginRight: '0.7rem', paddingLeft: '1.5rem', paddingRight: '1.5rem', borderRadius: '25px'}}>
                Log In
              </Button>
              <Button className="text-white" variant="info" size="lg" as={Link} to="/register" style={{ fontWeight: 'bold', fontSize: '0.8rem', paddingLeft: '1.5rem', paddingRight: '1.5rem', borderRadius: '25px'}}>
                Create an Account
              </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavigationBar;