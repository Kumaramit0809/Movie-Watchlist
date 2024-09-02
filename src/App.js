import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';
import Watchlist from './components/Watchlist';
import Login from './components/Login';
import './App.css';

const App = () => {
  const [user, setUser] = useState(localStorage.getItem('user') || null);
  const [watchlist, setWatchlist] = useState([]);

  // Load watchlist from localStorage when user changes
  useEffect(() => {
    if (user) {
      const storedWatchlist = JSON.parse(localStorage.getItem(`${user}_watchlist`)) || [];
      setWatchlist(storedWatchlist);
    }
  }, [user]);

  // Save watchlist to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(`${user}_watchlist`, JSON.stringify(watchlist));
    }
  }, [watchlist, user]);

  const addToWatchlist = (movie) => {
    setWatchlist((prevWatchlist) => [...prevWatchlist, movie]);
  };

  const removeFromWatchlist = (id) => {
    setWatchlist((prevWatchlist) => prevWatchlist.filter(movie => movie.imdbID !== id));
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setWatchlist([]);
  };

  return (
    <Router>
      <Navbar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/movie/:id" element={<MovieDetail addToWatchlist={addToWatchlist} />} />
        <Route path="/watchlist" element={<Watchlist watchlist={watchlist} removeFromWatchlist={removeFromWatchlist} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
      </Routes>
    </Router>
  );
};

export default App;
