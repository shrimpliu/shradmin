import React from 'react';
import PropTypes from 'prop-types';

const FormField = () => (
  <span></span>
);

const formItemLayout = {
  labelCol: {
    lg: { span: 3 },
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    lg: { span: 6 },
    xs: { span: 24 },
    sm: { span: 12 },
  },
};

FormField.propTypes = {
  source: PropTypes.string.isRequired,
  input: PropTypes.element.isRequired,
  options: PropTypes.object,
  layoutSpan: PropTypes.object,
  format: PropTypes.func,
  parse: PropTypes.func,
};

FormField.defaultProps = {
  options: {},
  layoutSpan: formItemLayout,
  format: value => value,
  parse: value => value,
};

export default FormField;