import React from 'react'
import styled from 'styled-components'

export const Notify = ({errorsMessage, completeMessage}) => {
    
    if(errorsMessage) return (
        <NotifyContent>{errorsMessage}</NotifyContent>
    )
    if(completeMessage) return <NotifyContentComplete>{completeMessage}</NotifyContentComplete>

    return null

}
const NotifyContent = styled.div`
    max-width: 500px;
    width: 90%;
    margin: 20px auto;
    position: fixed;
    top: 0;
    right: 0;
    padding: 10px;
    transition: all .3s ease-in-out;
    background-color: #F1A5A2;
    color: #F9E6E6;
    border-radius: .25rem;
    z-index: 999;
`
const NotifyContentComplete = styled.div`
    max-width: 500px;
    z-index: 999;
    width: 90%;
    margin: 20px auto;
    position: fixed;
    top: 0;
    right: 0;
    padding: 10px;
    transition: all .3s ease-in-out;
    background-color: #1EAC73;
    color: #D7F8CE;
    border-radius: .25rem;
`