import { useMutation } from '@apollo/client';
import React from 'react';
import styled from 'styled-components';
import { DELETE_POST } from '../../graphql/mutations';
import { All_POST } from '../../graphql/queries';


function DelitePost({ id, setFetchDelete }) {

  const [deletePost] = useMutation(DELETE_POST, {
    refetchQueries: [{ query: All_POST }],
    onCompleted: (data) => {
        setFetchDelete(false)
    },
    onError: (error) => {
      alert('Error con esta peticion, intentelo nuevamenta mas tarde!');
    }
  })
  const handleDelete = () => {
    deletePost({ variables: { id } })
  }

  return <DeletePostContent>
    <div>
      <h5>¿Seguro que desea eliminar esta publicacion?</h5>
      <div>
        <button type="button" className="delete" onClick={() => setFetchDelete(false)}>Cancelar</button>
        <button type="button" onClick={handleDelete}>Continuar</button>
      </div>
    </div>
  </DeletePostContent>;
}
export default DelitePost;
const DeletePostContent = styled.div`
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
    width: 100%;
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
      padding: 30px;
      margin:30px;
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