import React from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';

const TextField = ({ source, record = {}, render, elStyle }) => {
  return <span style={elStyle}>{render(get(record, source), record)}</span>
};

TextField.PropTypes = {
  source: PropTypes.string.isRequired,
  elStyle: PropTypes.object,
  record: PropTypes.object,
  render: PropTypes.func,
};

TextField.defaultProps = {
  render: (value, record) => value
};

export default TextField;
