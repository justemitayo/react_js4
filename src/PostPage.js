import {React, useContext } from 'react';
import {useParams, Link, useNavigate} from 'react-router-dom';
import DataContext from './context/DataContext';
import api from './api/posts';

const PostPage = () => {
  const {posts, setPosts} = useContext(DataContext);
  const { id } = useParams();
  const history = useNavigate();
  const item = posts.find(item => (item.id).toString() === id);

  const handleDelete = async (id) => {
    try{
      await api.delete(`./posts/${id}`);
      const postList = posts.filter(item => item.id !== id);
      setPosts(postList);
      history('/');
    } catch (err) {
      console.log(`Error:${err.message}`);
    };
  }

  return (
    <main className='PostPage'>
      <article className='post'>
          {item &&
            <>
              <h2>{item.title}</h2>
              <p className='postDate'>{item.datetime}</p>
              <p className='postBody'>{item.body}</p>
              <Link to={`/edit/${item.id}`}><button className='editButton'>Edit Post</button></Link>
              <button className='deleteButton' onClick={() => handleDelete(item.id)}>Delete Post</button>
            </>
          }
          {!item &&
          <>
            <h2>Post Not Found</h2>
            <p>Well, that's interesting</p>
            <p>
              <Link to= '/'>Visit Our Homepage</Link>
            </p>
          </>
          }
      </article>
    </main>
  )
}

export default PostPage