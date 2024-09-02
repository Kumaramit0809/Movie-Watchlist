import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../MovieList.css'; // Import the CSS file

const MovieList = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=ebd0393f`);
      const data = await response.json();

      if (data.Response === 'True') {
        setMovies(data.Search || []);
        setError(''); // Clear any previous errors
      } else {
        setMovies([]);
        setError('No movies found.');
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to fetch movies. Please try again later.');
    }
  };

  return (
    <div className="movie-list-container">
      <h1 className='wellcome'>Welcome to Movieflexia</h1>
      <text className='millions'>Millions of Movies, TV shows and People to discover. Explore now.</text>
      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies..."
        />
        <button type="submit">Search</button>
      </form>
      {error && <div className="error-message">{error}</div>}
      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.imdbID}>
            <Link className='title' to={`/movie/${movie.imdbID}`}>
              <img src={movie.Poster} alt={movie.Title} />
              <h3>{movie.Title}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
