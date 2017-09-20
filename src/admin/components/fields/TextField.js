import React from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';

const TextField = ({ source, record = {}, format, elStyle }) => {
  return <span style={elStyle}>{format(get(record, source), record)}</span>
};

TextField.PropTypes = {
  source: PropTypes.string.isRequired,
  elStyle: PropTypes.object,
  record: PropTypes.object,
  format: PropTypes.func,
};

TextField.defaultProps = {
  format: (value, record) => value
};

export default TextField;
