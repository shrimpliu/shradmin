import React from 'react';
import { Route, Switch } from 'mirrorx';
import { Authorization } from './auth';

const ModelRoute = ({ name, list, create, edit, show, remove }) => {

  const AuthorizationComponent = (component, route) => routeProps => (
    <Authorization>
      {React.createElement(component, {...routeProps})}
    </Authorization>
  );

  return (
    <Switch>
      {list && <Route exact path={`/${name}`} render={AuthorizationComponent(list, "list")}/>}
    </Switch>
  );

};

export default ModelRoute;