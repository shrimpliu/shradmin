import React from 'react';
import get from 'lodash/get';
import isBoolean from 'lodash/isBoolean';
import PropTypes from 'prop-types';
import { Icon } from 'antd';

const BooleanField = ({ source, record = {}, elStyle }) => {
  const value = isBoolean(get(record, source)) ? get(record, source) : !!get(record, source);
  return value ?
    <Icon type="check" style={elStyle} /> :
    <Icon type="close" style={elStyle}/>;
};

BooleanField.propTypes = {
  elStyle: PropTypes.object,
  record: PropTypes.object,
  source: PropTypes.string.isRequired,
};

BooleanField.defaultProps = {
  elStyle: { },
};

export default BooleanField;