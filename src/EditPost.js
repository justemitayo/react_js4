import React from 'react';
import { useEffect, useContext, useState } from 'react';
import {useParams, Link, useNavigate} from 'react-router-dom';
import { format } from 'date-fns';
import api from  './api/posts';
import DataContext from './context/DataContext';



const EditPost = () => {
    const [editTitle, setEditTitle] = useState('');
    const [editBody, setEditBody] = useState('');
    const { posts, setPosts } = useContext(DataContext);
    const { id } = useParams();
    const history = useNavigate();
    const item = posts.find(item => (item.id).toString() === id);

    useEffect(() => {
        if (item) {
            setEditTitle(item.title);
            setEditBody(item.body);
        }
    },[item, setEditTitle, setEditBody]);

    const handleEdit = async (id) => {
        const datetime = format(new Date(), 'MMMM dd yyyy pp');
        const updatedPost = {id, title: editTitle, datetime, body: editBody};
        try{
          // api.patch is for specific fields
          const response = await api.put(`./posts/${id}`, updatedPost);
          setPosts(posts.map(item => item.id === id ? {...response.data} : item));
          setEditTitle('');
          setEditBody('');
          history('/');
        } catch (err) {
          console.log(`Error:${err.message}`);
        }
      };
  return (
        <main className='NewPost'>
            {editTitle &&
                <>
                    <h2>EditPost Post</h2>
                    <form className='newPostForm' onSubmit={(e) => e.preventDefault()}> 
                        <label htmlFor='editTitle'>Title:</label>
                        <input 
                            id='editTitle'
                            type='text'
                            required
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                        />
                        <label htmlFor='editBody'>Post:</label>
                        <textarea
                            id='editBody'
                            required
                            value={editBody}
                            onChange={(e) => setEditBody(e.target.value)}
                        />
                        <button type='submit' onClick={() => handleEdit(item.id)}>submit</button>

                    </form>
                </>
            }
            {!editTitle &&
                <>
                    <h2>Post Not Found</h2>
                    <p>Well, that's interesting</p>
                    <p>
                        <Link to= '/'>Visit Our Homepage</Link>
                    </p>
                </>
            }  
        </main>
    )
}

export default EditPost