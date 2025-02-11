import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Posts from './components/Posts';
import CreatePost from './components/CreatePost';

const App = () => {
  const [token, setToken] = useState('');

  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/posts/lumen">Lumen Posts</Link>
          </li>
          <li>
            <Link to="/posts/node">Node.js Posts</Link>
          </li>
          <li>
            <Link to="/create-posts">Create Post</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/posts/lumen" element={<Posts token={token} source="lumen" />} />
        <Route path="/posts/node" element={<Posts token={token} source="node" />} />
        <Route path="/create-posts" element={<CreatePost token={token} />} />
        <Route path="/" element={<h1>Welcome to the Posts App</h1>} />
      </Routes>
    </Router>
  );
};

export default App;