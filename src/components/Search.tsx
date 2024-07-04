import React, { useState, useEffect } from 'react';
import { Form, FormControl, Alert } from 'react-bootstrap';
import axios from 'axios';
import { SearchResult, Book } from '../types';
import '../index.css';

interface SearchProps {
  onSearchResults: (results: Book[]) => void;
  sortByYear: boolean;
}

const Search: React.FC<SearchProps> = ({ onSearchResults, sortByYear }) => {
  const [query, setQuery] = useState<string>('');
  const [timer, setTimer] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [typing, setTyping] = useState<boolean>(false);

  const handleSearch = async (searchQuery: string) => {
    if (searchQuery.trim() === '') {
      onSearchResults([]);
      return;
    }

    setTyping(false);
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get<SearchResult>(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(searchQuery)}`
      );

      let books = response.data.docs;

      if (sortByYear) {
        books = books.sort((a, b) => (a.first_publish_year || 0) - (b.first_publish_year || 0));
      }

      onSearchResults(books);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data. Please try again later.');
      onSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (timer) {
      clearTimeout(timer);
    }
    setTimer(
      window.setTimeout(() => {
        handleSearch(query);
      }, 200) 
    );
    setTyping(true);
  }, [query, sortByYear]);

  return (
    <>
      {loading && !typing && (
        <div className="page-loader">
          <div className="spinner"></div>
        </div>
      )}
      <Form className={`d-inline-flex ms-2 col-md-12 text-left search-bar ${loading && !typing ? 'blur-background' : ''}`}>
        <FormControl
          type="text"
          placeholder="Search for books"
          className="mr-sm-2"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </Form>
      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
    </>
  );
};

export default Search;
