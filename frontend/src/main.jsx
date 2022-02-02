import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { ApolloClient, HttpLink, ApolloLink, InMemoryCache, ApolloProvider, from } from '@apollo/client';
import Context from './context/Context'
import { createUploadLink } from 'apollo-upload-client'

//const httpLink = new HttpLink({ uri: 'http://localhost:5000/graphql' });

const activityMiddleware = new ApolloLink((operation, forward) => {
  const token = window.sessionStorage.getItem('token')
  const authorization = token ? `${token}` : ''
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      'x-token': authorization
    }
  }));
  return forward(operation);
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  connectToDevTools: true,
  link: from([
    activityMiddleware,
    createUploadLink({
      uri: 'http://localhost:5000/graphql',
      fetch
    })
  ]),
  onError: err => {
    if (err) {
      window.sessionStorage.removeItem('token')
      window.sessionStorage.removeItem('uid')
      window.location.href = '/'
    }
  }
});


ReactDOM.render(
  <Context.Provider>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Context.Provider>,
  document.getElementById('root')
)
