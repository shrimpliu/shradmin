import React from 'react';
import { Route } from 'mirrorx';
import { Authorization } from '../../src';

export default [
  <Route exact path="/test" render={() => (
    <Authorization>
      <div>test</div>
    </Authorization>
  )}/>
];