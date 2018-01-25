import { message } from 'antd';
import inflection from 'inflection';

const translate = (content, state) => {
  const polyglot = state.i18n;
  return polyglot.t(content, {
    _: inflection.humanize(content),
  });
};

export default {
  name: "notification",
  initialState: null,
  effects: {
    success(content, getState) {
      if (content) {
        message.success(translate(content, getState()));
      }
    },
    error(content, getState) {
      if (content) {
        message.error(translate(content, getState()));
      }
    },
    info(content, getState) {
      if (content) {
        message.info(translate(content, getState()));
      }
    },
    warning(content, getState) {
      if (content) {
        message.warning(translate(content, getState()));
      }
    },
  },
}