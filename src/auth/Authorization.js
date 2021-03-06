import React, { Component } from 'react';
import { actions } from 'mirrorx';

class Authorization extends Component {

  componentWillMount() {
    actions.auth.check();
  }

  render() {
    const { children, ...rest } = this.props;
    return React.cloneElement(children, rest);
  }

}

export default Authorization;