import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

const hasNumberFormat = !!(typeof Intl === 'object' && Intl && typeof Intl.NumberFormat === 'function');

export const NumberField = ({ record, source, locale, options, elStyle }) => {
  if (!record) return null;
  const value = get(record, source);
  if (value === null) return null;
  if (!hasNumberFormat) return <span style={elStyle}>{value}</span>;
  return <span style={elStyle}>{value.toLocaleString(locale, options)}</span>;
};

NumberField.propTypes = {
  elStyle: PropTypes.object,
  locale: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  options: PropTypes.object,
  record: PropTypes.object,
  source: PropTypes.string.isRequired,
};

NumberField.defaultProps = {
  elStyle: {},
};

export default NumberField;
