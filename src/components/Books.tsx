import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { Book } from '../types';

interface BooksProps {
  books: Book[];
}

const Books: React.FC<BooksProps> = ({ books }) => {
  const [visibleBooks, setVisibleBooks] = useState<Book[]>([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisibleBooks(books);
    }, 10);

    return () => clearTimeout(timeout);
  }, [books]);


  useEffect(() => {
    const cards = document.querySelectorAll('.book-card');
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('throw-animation');
      }, index * 10); 
    });

    const cleanupTimeout = setTimeout(() => {
      cards.forEach((card) => {
        card.classList.remove('throw-animation');
      });
    }, books.length * 100 + 200); 

    return () => clearTimeout(cleanupTimeout);
  }, [visibleBooks]);

  return (
    <Row>
      {visibleBooks.map((book, index) => (
        <Col key={index} sm={12} md={6} lg={4} className="mb-4">
          <Card className="h-100 shadow-sm book-card">
            <Card.Body>
              <Card.Title className="font-weight-bold">{book.title}</Card.Title>
              <Card.Text >
                <strong>Author(s):</strong> {book.author_name?.join(', ') || 'N/A'}
              </Card.Text>
              <Card.Text>
                <strong>First Published:</strong> {book.first_publish_year || 'N/A'}
              </Card.Text>
              <Card.Text>
                <strong>ISBN:</strong> {book.isbn?.[0] || 'N/A'}
              </Card.Text>
              <Card.Text>
                <strong>Number of Pages:</strong> {book.number_of_pages_median || 'N/A'}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default Books;
