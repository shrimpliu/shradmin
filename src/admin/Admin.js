import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Router, Switch, Route, render, connect, model as registerModel } from 'mirrorx';
import { LocaleProvider } from 'antd';
import locales from 'antd/lib/locale-provider';
import { Layout, Login } from './pages';
import models from './models';
import { getAuthModel } from './auth';
import { TranslationProvider, getLocaleModel } from './i18n';
import { registerResourceModel } from './utils';

models.forEach(model => {
  registerModel(model);
});

class Admin extends Component {

  componentDidMount() {
    const { children, authClient, language } = this.props;
    registerModel(getAuthModel(authClient));
    registerModel(getLocaleModel(language));
    React.Children.forEach(children, ({ props }) => {
      registerResourceModel(props.name);
    });
    render();
  }

  render() {

    const { locale, messages } = this.props;

    return (
      <LocaleProvider locale={locales[locale]}>
        <TranslationProvider locale={locale} messages={messages}>
          <Router>
            <div>
              <Switch>
                <Route exact path="/login" component={Login}/>
                <Route path="/" component={Layout}/>
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
};

Admin.propTypes = {
  authClient: PropTypes.func.isRequired,
  language: PropTypes.string,
  messages: PropTypes.object,
};

export default connect(({locale}) => ({
  locale,
}))(Admin);