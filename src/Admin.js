import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Router, Switch, Route, render, model as registerModel } from 'mirrorx';
import { LocaleProvider } from 'antd';
import locales from 'antd/lib/locale-provider';
import { Layout, Login, Menu, UserMenu, Dashboard, AppBar } from './pages';
import Routes from './Routes';
import models from './models';
import { getAuthModel } from './auth';
import { getI18nModel } from './i18n';
import { registerResourceModel } from './utils';

models.forEach(model => {
  registerModel(model);
});

class Admin extends Component {

  componentWillMount() {
    const { children, authClient, restClient, locale, messages } = this.props;
    registerModel(getAuthModel(authClient));
    registerModel(getI18nModel(locale, messages));
    React.Children.forEach(children, ({ props }) => {
      registerResourceModel(props.name, restClient);
    });
    render();
  }

  render() {

    const { locale, appLayout, title, menu, dashboard, userMenu, appBar, children } = this.props;

    const models = React.Children.map(children, ({props}) => props) || [];

    return (
      <LocaleProvider locale={locales[locale]}>
        <Router>
          <div className="shradmin">
            <Switch>
              <Route exact path="/login" component={Login}/>
              <Route path="/" render={() => React.createElement(appLayout || Layout, {
                menu: React.createElement(menu || Menu, {
                  models,
                }),
                userMenu: React.createElement(userMenu || UserMenu),
                appBar: React.createElement(appBar || AppBar, {

                }),
                routes: React.createElement(Routes, {
                  models,
                  dashboard: dashboard || Dashboard,
                }),
                title,
              })} />
            </Switch>
          </div>
        </Router>
      </LocaleProvider>
    );
  }
}

Admin.defaultProps = {
  locale: "zh",
  messages: {},
  title: "Shradmin",
};

Admin.propTypes = {
  appLayout: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  authClient: PropTypes.func.isRequired,
  locale: PropTypes.string,
  messages: PropTypes.object,
  title: PropTypes.node,
  menu: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  dashboard: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  restClient: PropTypes.func,
};

export default Admin;