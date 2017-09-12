import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Router, Switch, Route, render, model as registerModel } from 'mirrorx';
import { Layout, Login } from './pages';
import models from './models';
import { getAuthModel } from './auth';
import { registerResourceModel } from './utils';

models.forEach(model => {
  registerModel(model);
});

class Admin extends Component {

  componentDidMount() {
    const { children, authClient } = this.props;
    registerModel(getAuthModel(authClient));
    React.Children.forEach(children, ({ props }) => {
      registerResourceModel(props.name);
    });
    render();
  }

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/login" component={Login}/>
            <Route path="/" component={Layout}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

Admin.propTypes = {
  authClient: PropTypes.func.isRequired,
};

export default Admin;