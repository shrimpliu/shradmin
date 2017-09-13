import PropTypes from 'prop-types';
import { getContext } from 'recompose';

export default (Component) => {
  const TranslatedComponent = getContext({
    translate: PropTypes.func.isRequired,
    locale: PropTypes.string.isRequired,
  })(Component);

  TranslatedComponent.defaultProps = Component.defaultProps;

  return TranslatedComponent;

};