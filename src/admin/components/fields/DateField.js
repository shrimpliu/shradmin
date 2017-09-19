import React from 'react';
import get from 'lodash.get';
import PropTypes from 'prop-types';

const toLocaleStringSupportsLocales = (() => {
  // from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString
  try {
    new Date().toLocaleString("i");
  } catch (error) {
    return (error instanceof RangeError);
  }
  return false;
})();

const DateField = (props) => {
  const { source, record = {}, elStyle, showTime = false, options, locales } = props;
  console.log(props);
  if (!record) return null;
  const value = get(record, source);
  if (value === null) return null;
  const date = value instanceof Date ? value : new Date(value);
  const dateString = showTime ?
    (toLocaleStringSupportsLocales ? date.toLocaleString(locales, options) : date.toLocaleString()) :
    (toLocaleStringSupportsLocales ? date.toLocaleDateString(locales, options) : date.toLocaleDateString());

  return <span style={elStyle}>{dateString}</span>;
};

DateField.propTypes = {
  elStyle: PropTypes.object,
  locales: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  options: PropTypes.object,
  record: PropTypes.object,
  showTime: PropTypes.bool,
  source: PropTypes.string.isRequired,
};

export default DateField;