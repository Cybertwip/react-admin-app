import React, { Component } from 'react'
import { Button, Jumbotron } from 'reactstrap'

class Home extends Component {
  constructor (props) {
    super(props);


    this.onCodeBtnClick = this.onCodeBtnClick.bind(this);
  }

  onCodeBtnClick(){
    const url = "https://github.com/VictorJL/react-web-admin-app";
    window.open(url, '_blank');  
  }

  render() {

    return (
      <div>
        <Jumbotron>
          <h1 className="display-3">Welcome!</h1>
          <p className="lead">This is a sample web application showcasing the CRUD operations that can be done against a simple express server.</p>
          <hr className="my-2" />
          <p>It makes use of React and Postgres as a backend database.</p>
          <hr className="my-2" />
          <p>Oh, by the way, it is deployed on Heroku.</p>
          <p className="lead">
            <Button color="primary" onClick={()=>this.onCodeBtnClick()}>Start coding!</Button>
          </p>
        </Jumbotron>
      </div>
    )


    

  }
}

export default Home