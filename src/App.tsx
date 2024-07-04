import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { Container, Row, Col, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import Search from './components/Search';
import Books from './components/Books';
import { Book } from './types';

const App: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [sortByYear, setSortByYear] = useState<boolean>(false);

  const handleSortChange = (value: string) => {
    setSortByYear(value === 'true');
  };

  const handleSearchResults = (results: Book[]) => {
    console.log('Received Books:', results);
    setBooks(results);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <Container className="flex-grow-1 mt-4 main-container">
        <Row className="align-items-center mb-3">
          <Col xs={12} md={8} className="d-flex justify-content-center">
            <Search onSearchResults={handleSearchResults} sortByYear={sortByYear} />
          </Col>
          <Col xs={12} md={4} className="d-flex justify-content-center justify-content-md-end mt-3 mt-md-0">
            <ToggleButtonGroup
              type="radio"
              name="sortOptions"
              defaultValue="false"
              onChange={handleSortChange}
            >
              <ToggleButton id="tbg-radio-1" value="false" className="toggle-btn">
                Sort by Relevance
              </ToggleButton>
              <ToggleButton id="tbg-radio-2" value="true" className="toggle-btn">
                Sort by Year
              </ToggleButton>
            </ToggleButtonGroup>
          </Col>
        </Row>
        <Books books={books} />
      </Container>
      <Footer />
    </div>
  );
};

export default App;
