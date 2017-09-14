import React from 'react';
import PropTypes from 'prop-types';

const TextField = ({ name, record, render }) => (
  <span>{render(record[name], record)}</span>
);

TextField.defaultProps = {
  render: (value, record) => value
};

TextField.propTypes = {
  render: PropTypes.func,
};

export default TextField;