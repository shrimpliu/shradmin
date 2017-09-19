import React from 'react';
import get from 'lodash.get';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import { Icon } from 'antd';

const BooleanField = ({ source, record = {}, elStyle }) => {
  if (get(record, source) === false) {
    return <Icon type="close" style={elStyle}/>;
  }

  if (get(record, source) === true) {
    return <Icon type="check" style={elStyle} />;
  }

  return <span style={elStyle} />;
};

BooleanField.propTypes = {
  elStyle: PropTypes.object,
  record: PropTypes.object,
  source: PropTypes.string.isRequired,
};

const PureBooleanField = pure(BooleanField);

PureBooleanField.defaultProps = {
  elStyle: {
    display: 'block',
    margin: 'auto',
  },
};

export default PureBooleanField;