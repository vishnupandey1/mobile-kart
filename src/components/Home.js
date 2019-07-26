import React from 'react';

import Container from '@material-ui/core/Container';
import ListProducts from './Products/ListProducts';
import Header from './Header/Header';

const styles = {
  height:'auto',
  margin:'100px 30px 30px 30px'
}

const Home = () => {
  return (
    <div className="home">
      <Header/>
      <div style={styles}>
        <Container>
          <ListProducts />
        </Container>
      </div>
    </div>
  );
}

export default Home;
