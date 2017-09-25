import React from 'react';
import { Route, Switch } from 'mirrorx';
import ModelRoute from './ModelRoute';
import { Authorization } from './auth';

const Routes = ({ models, dashboard }) => (
  <Switch>
    <Route exact path="/" render={routeProps => (
      <Authorization {...routeProps}>
        {React.createElement(dashboard)}
      </Authorization>
    )} />
    {models.map((model) => (
      <Route
        path={`/${model.name}`}
        key={model.name}
        render={() => (
          <ModelRoute {...model}/>
        )}
      />
    ))}
  </Switch>
);

export default Routes;