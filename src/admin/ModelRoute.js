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
      {show && <Route exact path={`/${name}/:id/show`} render={AuthorizationComponent(show, "show")}/>}
    </Switch>
  );

};

export default ModelRoute;