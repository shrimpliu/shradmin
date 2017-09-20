import React from 'react';
import { Route, Switch } from 'mirrorx';
import { Authorization } from './auth';

const ModelRoute = ({ name, list, create, edit, show, hasDelete }) => {

  const AuthorizationComponent = (component, route, model) => routeProps => (
    <Authorization>
      {React.createElement(component, {
        model,
        hasList: !!list,
        hasEdit: !!edit,
        hasCreate: !!create,
        hasShow: !!show,
        hasDelete,
        ...routeProps,
      })}
    </Authorization>
  );

  return (
    <Switch>
      {list && <Route exact path={`/${name}`} render={AuthorizationComponent(list, "list", name)}/>}
      {show && <Route exact path={`/${name}/:id/show`} render={AuthorizationComponent(show, "show", name)}/>}
      {create && <Route exact path={`/${name}/create`} render={AuthorizationComponent(create, "create", name)}/>}
      {edit && <Route exact path={`/${name}/:id`} render={AuthorizationComponent(edit, "edit", name)}/>}
    </Switch>
  );

};

export default ModelRoute;