import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import styled from 'styled-components';
import { UPDATE_POST } from '../../graphql/mutations';
import { All_POST } from '../../graphql/queries';


function UpdatePost({ id, title, description, setFetchUpdate }) {
  const [newTitle, setNewTitle] = useState(title)
  const [newDescription, setNewDescription] = useState(description)
  const [errors, setErrors] = useState({})

  const [postUpdate] = useMutation(UPDATE_POST, {
    refetchQueries: [{ query: All_POST }],
    onCompleted: (data) => {
      setFetchUpdate(false)
    },
    onError: (error) => {
      alert('Error con esta peticion, intentelo nuevamenta mas tarde!');
    }
  })
  const handleUpdate = () => {
    let error = {}
    if (!newTitle.trim()) {
      error.title = "El titulo es requerido"
    }
    if (newTitle.trim().length > 50) {
      error.title = "Titulo debe ser menor a 50 caracteres"
    }

    if (!newDescription.trim()) {
      error.description = "La descripción es requerida"
    }
    if (newDescription.trim().length > 240) {
      error.description = "Descripción debe ser menor de 240 caracteres"
    }

    console.log('asddasd', newDescription, newTitle)

    if (Object.keys(error).length === 0) {
      postUpdate({ variables:{ id, title: newTitle, description: newDescription} })
    }else{
      if(error.description){
        alert(error.description)
      }
      if(error.title){
        alert(error.title)
      }
    }

  }

  return <UpdatePostContent>
    <div>
      <h5>Editar publicacion</h5>
      <input
        placeholder="Edita el titulo de tu publicación" value={newTitle}
        type="text"
        onChange={(e) => setNewTitle(e.target.value)}
      />
      <textarea
        placeholder="Edita la description de tu publicacion"
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
        type="text" />
      <div>
        <button type="button" className="delete" onClick={() => setFetchUpdate(false)}>Cancelar</button>
        <button type="button" onClick={handleUpdate}>Actualizar</button>
      </div>
    </div>
  </UpdatePostContent>;
}
export default UpdatePost;
const UpdatePostContent = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  display:flex;
  justify-content:center;
  align-items:center;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 100;
  >div{
    max-width:600px;
    min-height: 200px;
    width:  100%;
    padding: 30px;
    background-color: white;
    display:flex;
    flex-direction: column;
    align-items:center;;
    text-align: center;
    background-color: #172b3a;
    border-radius: 5px;
    
    >h5{
      font-size: 16px;
      color: #2a7ed3;
      box-shadow: 0 3px 10px rgb(0 0 10px / 0.5);
      padding: 10px;
      margin:10px;
    }
    input, textarea{
       padding: 15px 20px;
        border: 1px solid #172B3A;
        font-size: 16px;
        font-weight: 700;
        margin: 10px auto;
        outline: 0;
        width: 90%;
        border-radius: 5px;
        background: #0F202D;
        color: #8B959C;
        z-index:1;
    }
    >div{
      display: flex;
      align-items: center;
      >button{
        margin: 5px;
        padding: 7px 30px;
        font-size: 14px;
        border: none;
        border-radius: 5px;
        background: #2a7ed3;
        color: white;
        font-weight: 700;
        
        &.delete{
          background-color:#d64292;
        }
      }
    }
  }
`