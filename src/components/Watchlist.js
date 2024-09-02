import React from 'react';
import '../Watchlist.css'; // Import the CSS file

const Watchlist = ({ watchlist, removeFromWatchlist }) => {
  return (
    <div className="watchlist-container">
      <div className="watchlist-header">
        <h1 className='header'>My Watchlist</h1>
      </div>
      {watchlist.length === 0 ? (
        <>
          <p className="watchlist-empty">Your watchlist is empty.</p>
          <lottie-player
            className="gif-img"
            src="https://lottie.host/982d302b-fa21-406c-8a17-3f06e783125b/5hGqJk6zOU.json"
            background="transparent"
            speed="1"
            style={{ width: '500px', height: '500px' }} // Adjust size if needed
            loop
            autoplay
          ></lottie-player>
        </>
      ) : (
        <div>
          {watchlist.map((movie) => (
            <div className="container" key={movie.imdbID}>
              <div>
                <img src={movie.Poster} alt={movie.Title} height={400} width={400} />
              </div>
              <div className="title">
                <h3 className="title">{movie.Title}</h3>
                <p className="year">{movie.Year}</p>
                <p className="summary">{movie.Plot}</p>
                <button className="remove-btn" onClick={() => removeFromWatchlist(movie.imdbID)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;
