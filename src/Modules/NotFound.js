import React, { Component } from 'react'
import { Container } from 'reactstrap'
import { Jumbotron } from 'reactstrap'


class NotFound extends Component {
  
  render() {
    return (
      <Container className="Resources">
        <Jumbotron>
          <h1 className="display-3">404 Not found</h1>
          <p className="lead">This isn't the page you're looking for.</p>
        </Jumbotron>
      </Container>
      
    )


    

  }
}

export default NotFound