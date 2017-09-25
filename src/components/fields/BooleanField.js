import React from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import { Icon } from 'antd';

const BooleanField = ({ source, record = {}, elStyle, format }) => {
  const value = format(get(record, source), record);
  return <Icon style={elStyle} type={!!value ? "check" : "close"} />;
};

BooleanField.propTypes = {
  elStyle: PropTypes.object,
  record: PropTypes.object,
  source: PropTypes.string.isRequired,
  format: PropTypes.func,
};

BooleanField.defaultProps = {
  format: (value, record) => value,
  elStyle: { },
};

export default BooleanField;