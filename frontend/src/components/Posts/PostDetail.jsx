import React, { useState } from 'react';
import styled from 'styled-components';
import { ChatAltIcon, ShareIcon, ThumbUpIcon, PencilAltIcon, TrashIcon } from "@heroicons/react/outline"
import UpdatePost from './UpdatePost';
import DelitePost from './DelitePost';


function PostDetail({
  id,
  title,
  description,
  image,
  author,
  photo,
  uid,
  createdAt,
  userId
}) {
  
  const [fetchDelete, setFetchDelete] = useState(false)
  const [fetchUpdate, setFetchUpdate] = useState(false)

  return <PostContent>
  {fetchDelete &&
    <DelitePost 
   id={id} 
   setFetchDelete={setFetchDelete}
     
   />}
   {
     fetchUpdate && <UpdatePost 
       id={id}
       title={title}
       description={description}
       setFetchUpdate={setFetchUpdate}
     />
   }
    <div className="author">
    {userId === uid  && <div className="icons-action">
        <PencilAltIcon  
        className="update" 
        onClick={() => setFetchUpdate(true)}
        />
        <TrashIcon 
        className="delite" 
        onClick={()=> setFetchDelete(true)}
        />
      </div> }
      
      <div>
        <img src={photo ? photo : "https://cdn.icon-icons.com/icons2/827/PNG/128/user_icon-icons.com_66546.png"} alt={title} />
        <div>
          <p>{author}</p>
          <p>{new Date(createdAt).toLocaleString()}</p>
        </div>
      </div>
      <p> <b>{title}</b> <br />{description}</p>
    </div>
    {image && (<div className="image"><img src={image} alt="" /></div>)}
    <div className="footer">
      <div className="icons">
        <ThumbUpIcon className="h-4" />
        <p>Me gusta</p>
      </div>
      <div className="icons">
        <ChatAltIcon className="h-4" />
        <p>Comentarios</p>
      </div>
      <div className="icons">
        <ShareIcon className="h-4" />
        <p>compartir</p>
      </div>
    </div>
  </PostContent>;
}

export default PostDetail;

const PostContent = styled.div`
display: flex;
padding: 10px;
margin: 10px;
background-color: #0B1924;
flex-direction: column;
justify-content: center;
align-items: center;
box-shadow: 0 3px 10px rgb(0 0 10px / 0.5);
border-radius: .25rem;
.icons-action{
   display: flex;
   top: 5px;
   right: 0;
   position: absolute;
   width: 60px;
   gap: 10px;
   .update{
     color: #29AB4F;
     cursor: pointer;
     &:hover{
      opacity: .8;
     }
   }
   .delite{
     color: #C33154;
    cursor: pointer;
     &:hover{
      opacity: .8;
     }
   }
 }
.author{
 width: 100%;
 display: flex;
 flex-direction: column;
 position: relative;

 >div{
   padding: 10px;
   display: flex;
   >img{
     width: 50px;
     height: 50px;
     border-radius: 50px;
   } 
   >div{
     padding-left: 10px;
     color: #f0f0f0;
     font-weight: 500;
     font-size: 12px
   }
  
 }

 >p{
   padding: 0 10px;
   background-color: #273742;
   padding: 5px 10px;
   color: #efefef;
   font-weight: 400;
   font-size: 14px
 }
}
.image{
  position: relative;
  width: 100%;
  height: 350px;
  background-color: #273742;
  >img{
    object-fit: cover;
    width: 100%;
    height:100%
  }
}
.footer{
    background-color: #273742;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-around;
    color: #b9b9b9;
    padding: 5px 0;
    position: relative;
    flex-wrap: wrap;
    >.icons{
    display: flex;
    cursor: pointer;
    &:hover{
      opacity: .8;
    }
    .h-4{
      width: 24px;
    }
    >p{
      padding:5px;
      min-width: 75px;
    }
    }

  }
`
