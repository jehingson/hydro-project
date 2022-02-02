import React, { useContext, useState, useEfetch } from 'react';
import styled from 'styled-components';
import { Context } from '../context/Context';
import axios from 'axios'
import { UPDATE_USER } from '../graphql/mutations';
import { useMutation, useQuery } from '@apollo/client';
import { All_POST, FETCH_USER } from '../graphql/queries';


function Profile() {
  const { removeAuth, users, setUser } = useContext(Context)
  const [updateUser] = useMutation(UPDATE_USER, {
    refetchQueries: [{ query: All_POST }, {query: FETCH_USER }], 
    onCompleted: (data) => {
      setUser(data)
    }
  })

  const { data } = useQuery(FETCH_USER)
  if(data){
    setUser(data.fetchUser)
  }

  const hendleUpload = e => {
    const file = e.target.files[0]
    if (!file) return
    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", "bqvu6rdw")
    axios.post("https://api.cloudinary.com/v1_1/jehingson/image/upload", formData).then((res) => {
      updateUser({ variables: { username: users.username, photo: res.data.url } })
    }).catch((err) => {
      alert('Error archivo o formato incorrecto!')
    })
  }

  return <ProfileContent>
    <div>
      <div>
        <img src={users.photo ? users.photo : "https://cdn.icon-icons.com/icons2/827/PNG/128/user_icon-icons.com_66546.png"} alt="" />
        <button type="button">Editar foto</button>
        <input type="file" name="file" onChange={hendleUpload} />
      </div>
      <br />
      <h4>{users.username}</h4>
      <p><b></b>Email:  {users.email} </p>
      <button onClick={removeAuth} className="session" type="button">Cerrar sesión</button>
    </div>
  </ProfileContent>;
}

export default Profile;

const ProfileContent = styled.div`
flex: 0.35;
position: relative;
overflow: hidden;
background-color:#0f202d;
button{
        border: none;
        font-size: 14px;
        padding: 7px 12px;
        border-radius: 5px;
        font-weight: bold;
        color: #f1f2f3;
        background: #f18f01;
      }
>div{
    padding: 20px;
    padding:20px;
    position: fixed;
    >h4{
      font-size: 20px;
      color:#f0f0f0;
      b{
        color: #2a7ed3;
      }
      
    }
    >p{
      color:#f0f0f0;
    }
    >div{
      display: flex;
      align-items: start;
      img{
        width: 70px;
        height: 70px;
        border: 2px solid #2a7ed3;
        border-radius:50%;
        margin-right:10px;
      }
      >input{
        position:absolute;
        left: 100px;
        width: 100px;
        margin-top: 5px;
        opacity: 0;
      }
    }
    >.session{
        margin-top:40px;
        Background: #1e415b;
    }
}
@media(max-width: 800px){
  flex: 1;
  position: relative;
  >div{
    position: relative;
    padding: 20px 30px 20xp 50px;
  }
}
`