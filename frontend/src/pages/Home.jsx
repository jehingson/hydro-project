import React from 'react';
import styled from 'styled-components';
import Feed from '../components/Feed';
import Profile from '../components/Profile';



function Home() {
  return <>
    {/*Header*/}
    <HomeWrapper>
      {/*profile*/}
      <Profile />
      {/*feed*/}
      <Feed />
    </HomeWrapper>

  </>;
}

export default Home;

const HomeWrapper = styled.div`
max-width: 1300px;
margin: auto;
display: flex;
flex: 1;

@media(max-width: 800px){
  flex-direction: column;
  position: relative;
}
`
 