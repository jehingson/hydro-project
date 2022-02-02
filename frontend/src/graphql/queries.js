import { gql } from '@apollo/client';


export const All_POST = gql`
 query{
    allPost{
      id
	  title
      description
      image
      createdAt
   	  user{
        uid
        username
        photo
    }
  }
  }
`

export const FETCH_USER = gql`
 query {
   fetchUser{
        uid
        username
        photo
        email
      }
  }
`
