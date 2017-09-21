import Polyglot from 'node-polyglot';
import inflection from 'inflection';
import { messages as defaultMessages } from './';

export default (locale = "zh", customMessages) => {

  const customMessage = customMessages[locale] || {};
  const defaultMessage = defaultMessages[locale] || {};
  const message = { ...defaultMessage, ...customMessage };

  return {
    name: "i18n",
    initialState: new Polyglot({
      locale: locale,
      phrases: message,
    }),
    reducers: {
      setLocale(state, locale) {
        state.locale(locale);
        return state;
      },
      setMessage(state, message) {
        state.replace(message);
        return state;
      },
      extendMessage(state, message) {
        state.extend(message);
        return state;
      },
    },
    effects: {
      translate(text, getState) {
        const polyglot = getState().i18n;
        return polyglot.t(text, {
          _: inflection.humanize(text),
        });
      }
    }
  };
}