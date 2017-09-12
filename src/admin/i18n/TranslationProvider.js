import { Children } from 'react';
import PropTypes from 'prop-types';
import Polyglot from 'node-polyglot';
import { compose, withContext } from 'recompose';
import { messages as defaultMessages } from './';

const TranslationProvider = ({children}) => Children.only(children);

TranslationProvider.propTypes = {
  locale: PropTypes.string.isRequired,
  messages: PropTypes.object,
  children: PropTypes.element,
};

const withI18nContext = withContext({
  translate: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
}, ({ locale, messages = {} }) => {
  const message = messages[locale] || {};
  const defaultMessage = defaultMessages[locale] || {};
  const polyglot = new Polyglot({
    locale,
    phrases: { ...defaultMessage, ...message },
  });
  return {
    locale,
    translate: polyglot.t.bind(polyglot),
  };
});

export default compose(
  withI18nContext
)(TranslationProvider);
