import React from 'react';
import styled from 'styled-components';
import LoginRegister from '../components/LoginRegister';


export default function Login() {
  return <LoginWrapper>
      {/* Login */}
      <LoginRegister />
    
  </LoginWrapper>;
}


const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
`