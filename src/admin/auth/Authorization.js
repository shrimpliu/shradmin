import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { actions } from 'mirrorx';

class Authorization extends Component {

  componentWillMount() {
    console.log("mount");
    actions.auth.check();
  }

  render() {
    const { children, ...rest } = this.props;
    return React.cloneElement(children, rest);
  }

}

export default Authorization;