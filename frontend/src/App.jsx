import React from 'react'
import { Router } from '@reach/router'
import './App.css'
import Login from './pages/Login'
import Home from './pages/Home'
import Context from './context/Context'

function App() {
//  const {data, error, loading} = useQuery(All_Post, {pollInterval: 2000})

  return (
    <div className="App">
     <section>
      <Context.Consumer>
        {
          ({ isAuth }) =>
            isAuth
              ? <Router>
                <Home path='/' />
              </Router>
              : <Router>
                <Login path='/' />
              </Router>
        }
      </Context.Consumer>
     </section>
    </div>
  )
}

export default App
