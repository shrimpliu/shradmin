import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Router, Switch, Route, render, connect, model as registerModel } from 'mirrorx';
import { LocaleProvider } from 'antd';
import locales from 'antd/lib/locale-provider';
import { Layout, Login, Menu, Dashboard } from './pages';
import Routes from './Routes';
import models from './models';
import { getAuthModel } from './auth';
import { TranslationProvider, getLocaleModel } from './i18n';
import { registerResourceModel } from './utils';

models.forEach(model => {
  registerModel(model);
});

class Admin extends Component {

  componentWillMount() {
    const { children, authClient, language } = this.props;
    registerModel(getAuthModel(authClient));
    registerModel(getLocaleModel(language));
    React.Children.forEach(children, ({ props }) => {
      registerResourceModel(props.name);
    });
    render();
  }

  render() {

    const { locale, messages, appLayout, title, menu, dashboard, children } = this.props;

    const models = React.Children.map(children, ({props}) => props) || [];

    return (
      <LocaleProvider locale={locales[locale]}>
        <TranslationProvider locale={locale} messages={messages}>
          <Router>
            <div className="shradmin">
              <Switch>
                <Route exact path="/login" component={Login}/>
                <Route path="/" render={() => React.createElement(appLayout || Layout, {
                  menu: React.createElement(menu || Menu, {
                    models,
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
        </TranslationProvider>
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
  language: PropTypes.string,
  messages: PropTypes.object,
  title: PropTypes.node,
  menu: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  dashboard: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};

export default connect(({locale}) => ({
  locale,
}))(Admin);