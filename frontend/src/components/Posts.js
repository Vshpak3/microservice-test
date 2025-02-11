import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Posts = ({ token, source }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const config = source === 'lumen' ? { headers: { Authorization: `Bearer ${token}` } } : {};
        const url = source === 'lumen' ? 'http://localhost:8000/api/posts' : 'http://localhost:3000/api/posts';
        const response = await axios.get(url, config);
        setPosts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch posts');
        setLoading(false);
      }
    };

    fetchPosts();
  }, [token, source]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Posts from {source === 'lumen' ? 'Lumen' : 'Node.js'}</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p>By: {post.user ? post.user.name : 'Unknown'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;