import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../index.css';
import { FiHeart } from 'react-icons/fi';

const Footer: React.FC = () => (
  <footer className="bg-dark text-white mt-5 p-4 text-center">
    <Container>
      <Row>
        <Col>
        <p>
            Created by Akshata Gawas with <FiHeart className="text-danger" /> for Slowrida
        </p>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
