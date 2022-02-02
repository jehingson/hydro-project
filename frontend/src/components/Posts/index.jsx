import { useQuery } from '@apollo/client';
import React, { useContext,} from 'react';
import { All_POST } from '../../graphql/queries';
import PostDetail from './PostDetail';
import { Context } from '../../context/Context';


function Posts() {
  const { users } = useContext(Context)
  const { data, error } = useQuery(All_POST)
  console.log('login', error)
  if(error) return null
  
  return <div>
    {
      data && data.allPost?.map(post => <PostDetail 
          key={post.id}
          title={post.title}
          description={post.description}
          id={post.id}
          image={post.image}
          author={post.user.username}
          photo={post.user.photo}
          uid={post.user.uid} 
          createdAt={post.createdAt}
          userId={users.uid}
      />) 
    }
  </div>;
}

export default Posts;
