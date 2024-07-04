import React from 'react';
import { Navbar } from 'react-bootstrap';
import '../index.css';

const Header: React.FC = () => (
  <Navbar bg="transparent" variant="light" className=''>
    <Navbar.Brand href="/" className='m-3 p-1 fs-1 fw-bold'>Book Search</Navbar.Brand>
  </Navbar>
);

export default Header;
