import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

const TextField = ({ source, record, render }) => (
  <span>{render(get(record, source), record)}</span>
);

TextField.defaultProps = {
  render: (value, record) => value
};

TextField.propTypes = {
  source: PropTypes.string.isRequired,
  record: PropTypes.object,
  render: PropTypes.func,
};

export default TextField;