import React, { Component } from 'react';

import { Container  } from 'reactstrap'


import NavigationBar from './Components/Header/NavigationBar';
import FooterBar from './Components/Footer/FooterBar';
import RouterSwitch from './Components/Navigation/RouterSwitch'

class App extends Component {
  render() {
    return (
      <Container className="content"> 
      <NavigationBar></NavigationBar>

      <RouterSwitch />

      <Container>
        <FooterBar />
      </Container>

      </Container>

    );
  }
}

export default App;