import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

const TextField = ({ source, record, format }) => (
  <span>{format(get(record, source), record)}</span>
);

TextField.defaultProps = {
  format: (value, record) => value
};

TextField.propTypes = {
  source: PropTypes.string.isRequired,
  record: PropTypes.object,
  format: PropTypes.func,
};

export default TextField;