import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

const TextField = ({ source, record = {}, format, elStyle }) => {
  return <span style={elStyle}>{format(get(record, source), record)}</span>
};

TextField.propTypes = {
  source: PropTypes.string.isRequired,
  elStyle: PropTypes.object,
  record: PropTypes.object,
  format: PropTypes.func,
  format: PropTypes.func,
};

TextField.defaultProps = {
  format: (value, record) => value
};

export default TextField;