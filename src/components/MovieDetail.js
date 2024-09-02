import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../MovieDetail.css'; // Import the CSS file

const MovieDetail = ({ addToWatchlist }) => {
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState('');
  const { id } = useParams(); // Get movie ID from the route parameters

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=ebd0393f`);
        const data = await response.json();

        if (data.Response === 'True') {
          setMovie(data);
          setError(''); // Clear any previous errors
        } else {
          setError('Movie details not found.');
        }
      } catch (err) {
        console.error('Error fetching movie details:', err);
        setError('Failed to fetch movie details. Please try again later.');
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleAddToWatchlist = () => {
    if (movie) {
      addToWatchlist(movie);
    }
  };

  return (
    <div className="movie-detail-container">
      {error && <div className="error-message">{error}</div>}
      {movie ? (
        <div className="movie-detail">
          <h1>{movie.Title}</h1>
          <img src={movie.Poster} alt={movie.Title} />
          <p>{movie.Plot}</p>
          <p>Cast: {movie.Actors}</p>
          <p>Writer: {movie.Writer}</p>
          <p>Released on: {movie.Released}</p>
          <button className="add-to-watchlist-btn" onClick={handleAddToWatchlist}>
            Add to Watchlist
          </button>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default MovieDetail;
