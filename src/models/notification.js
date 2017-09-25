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
      message.success(translate(content, getState()));
    },
    error(content, getState) {
      message.error(translate(content, getState()));
    },
    info(content, getState) {
      message.info(translate(content, getState()));
    },
    warning(content, getState) {
      message.warning(translate(content, getState()));
    },
  },
}