import React from 'react'
import {  useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api/posts';
import { format } from 'date-fns';
import DataContext from './context/DataContext';

const NewPost = () => {
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const {posts, setPosts} = useContext(DataContext);
  const history = useNavigate();

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length > 0 ? (parseInt(posts[posts.length - 1].id, 10) + 1)?.toString() : 1;
    const datetime = format(new Date(), 'MMMM dd yyyy pp');
    const newPost = {id, title: postTitle, datetime, body: postBody};
    try{
    const response = await api.post('./posts', newPost);
      const allpost = [...posts, response.data];
      setPosts(allpost);
      setPostTitle('');
      setPostBody('');
      history('/');
    } catch (err) {
      console.log(`Error:${err.message}`);
    }
  }
  return (
    <main className='NewPost'>
        <h2>New Post</h2>
        <form className='newPostForm' onSubmit={handleSubmit}> 
          <label htmlFor='postTitle'>Title:</label>
          <input 
            id='postTitle'
            type='text'
            required
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
          />
          <label htmlFor='postBody'>Post:</label>
          <textarea
            id='postBody'
            required
            value={postBody}
            onChange={(e) => setPostBody(e.target.value)}
          />
          <button type='submit'>submit</button>

        </form>
    </main>
  )
}

export default NewPost