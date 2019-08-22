import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Home from './../../Modules/Home';
import Crud from './../../Modules/Crud';
import Resources from './../../Modules/Resources';
import NotFound from './../../Modules/NotFound';

class RouterSwitch extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={Home}></Route>
          <Route exact path='/crud' component={Crud}></Route>
          <Route exact path='/resources' component={Resources}></Route>
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default RouterSwitch;