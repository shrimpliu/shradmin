import React from 'react';
import PropTypes from 'prop-types';

const FormField = () => (
  <span></span>
);

FormField.propTypes = {
  source: PropTypes.string.isRequired,
  input: PropTypes.element.isRequired,
  options: PropTypes.object,
  format: PropTypes.func,
  parse: PropTypes.func,
};

FormField.defaultProps = {
  options: {},
  format: value => value,
  parse: value => value,
};

export default FormField;