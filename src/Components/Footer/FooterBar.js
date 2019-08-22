import React from 'react';
import {
  Container
 } from 'reactstrap';

export default class FooterBar extends React.Component {
  render() {
    return (
      <Container className="footer">
      <div className="Footer-credits">
        <span className="Footer-credit">Source code and examples released under the <a href="https://github.com/VictorJL/react-web-admin-app/blob/master/LICENSE">MIT</a> license.</span>
      </div>
      </Container>
    );
  }
}
