import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Jumbotron } from 'reactstrap'


class Resources extends Component {
  
  render() {
    return (
      <div>
        <Jumbotron>
          <h1 className="display-3">Resources</h1>
          <p className="lead">Below you can find learning resources for React that may be useful to understand how the application got coded.</p>
        </Jumbotron>

        <Container className="Videos">
          <Row>
            <Col>
              <iframe style={{margin: "0 20px" }} width="25%" height="200" title="React Tutorial - Learn ReactJS and build a simple CRUD app" src="https://www.youtube.com/embed/S66rHpyU-Eg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              <iframe style={{margin: "0 20px" }} width="25%" height="200" title="ReactJS and PostgreSQL: Full Stack Application" src="https://www.youtube.com/embed/2oAS7MtMwqA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              <iframe style={{margin: "0 20px" }} width="25%" height="200" title="Getting Started with PosgreSQL 11 for Windows 10 (2019)" src="https://www.youtube.com/embed/BLH3s5eTL4Y" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </Col>
          </Row>
        </Container>
      </div>
    )


  }
}

export default Resources