import React from 'react';
import get from 'lodash/get';
import isNull from 'lodash/isNull';
import PropTypes from 'prop-types';
import moment from 'moment';

const DateField = (props) => {
  const { source, record = {}, elStyle, dateFormat } = props;
  const value = get(record, source);
  if(isNull(value)){
    return null;
  }else if(!moment(value).isValid()){
    throw new Error(`moment(${value}) is not valid.`);
  }else{
    return <span style={elStyle}>{moment(value).format(dateFormat)}</span>;
  }
};

DateField.propTypes = {
  elStyle: PropTypes.object,
  record: PropTypes.object,
  source: PropTypes.string.isRequired,
  dateFormat: PropTypes.string
};

DateField.defaultProps = {
  dateFormat: "YYYY-MM-DD HH:mm:ss",
};

export default DateField;