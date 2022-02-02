import React from 'react';
import styled from 'styled-components';
import InputBox from './InputBox';
import Posts from './Posts';



function Feed() {
  return <FeedContent>
            {/*InputBox */}
            <InputBox />
            {/*Posts*/}
            <Posts />
        </FeedContent>;
}

export default Feed;

const FeedContent = styled.div`
flex: .5;
margin: auto;
overflow-y: auto;
@media(max-width: 1000px){
  flex: .6;
}
@media(max-width: 800px){
  flex: 1;
}


`