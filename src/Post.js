import React from 'react'
import { Link } from 'react-router-dom'

const Post = ({item}) => {
  return (
    <article className='post'>
        <Link to={`/post/${item.id}`}>
            <h2>{item.title}</h2>
            <p className='postDate'>{item.datetime}</p>
        </Link>
        <p className='postBody'>{
          (item.body).length <= 25 ? item.body : `${(item.body).slice(0, 25)}.....`
        }</p>
    </article>
  )
}

export default Post
