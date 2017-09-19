import React from 'react';
import PropTypes from 'prop-types';

const FormField = () => (
  <span></span>
);

FormField.propTypes = {
  source: PropTypes.string.isRequired,
  input: PropTypes.element.isRequired,
  options: PropTypes.object,
};

FormField.defaultProps = {
  options: {},
};

export default FormField;