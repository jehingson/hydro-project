import React, { useState } from 'react';
export const Context = React.createContext({})

const Provider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(() => {
        return window.sessionStorage.getItem('token')
    })
    const [users, setUser] = useState({})
    const value = {
        users,
        isAuth,
        setUser,
        activateAuth: (user) => {
            setIsAuth(true)
            window.sessionStorage.setItem('token', user.token)
            setUser(user)
        },
        removeAuth: () => {
            setIsAuth(false)
            setUser({})
            window.sessionStorage.removeItem('token')
            window.location.reload()
        }
    }
    return <Context.Provider value={value}>
        {children}
    </Context.Provider>;
}
export default {
    Provider,
    Consumer: Context.Consumer
}