import inflection from 'inflection';
import { connect } from 'mirrorx';

export default (Component) => connect(({ i18n }) => ({
  translate: (text, params = {}) => i18n.t(text, { _: inflection.humanize(text), ...params })
}))(Component);