import React from 'react'
import Feed from './Feed'
import { useContext } from 'react';
import DataContext from './context/DataContext';

const Home = () => {
  const { searchResults, fetchError, isLoading  } = useContext(DataContext);
  return (
    <main className='Home'>
      {isLoading && <p className='statusMsg'>Loading Post.......</p>}
      {!isLoading && fetchError && <p className='statusMsg' style={{color: 'red'}}>{fetchError}</p>}
      {!isLoading && !fetchError && (searchResults.length ? <Feed posts={searchResults}/> : <p className='statusMsg'>No Post To Display.....</p>)}
      {/* {posts?.length > 0 ? (
        <Feed posts={posts}/>
      ) : (
        <p style={{marginTop : '2rem'}}>No Post To Display.</p>
      )} */}
    </main>
  )
}

export default Home