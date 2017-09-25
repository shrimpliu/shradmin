import React from 'react';
import get from 'lodash/get';
import isFunction from 'lodash/isFunction';
import PropTypes from 'prop-types';

const SelectField = ({ source, record = {}, elStyle, choices, optionValue, optionText }) => {
  const value = get(record,source);
  const choice = choices.find(item => item[optionValue] === value);
  if (!choice) return null;
  const choiceName = React.isValidElement(optionText) ?
    React.cloneElement(optionText, { record: choice }) :
    (isFunction(optionText)?
        optionText(choice) :
        choice[optionText]
    );
  return (
    <span style={elStyle}>
      {choiceName}
    </span>
  );
};

SelectField.PropTypes = {
  source: PropTypes.string.isRequired,
  elStyle: PropTypes.object,
  record: PropTypes.object,
  choices: PropTypes.arrayOf(PropTypes.object),
  optionText: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.element,
  ]).isRequired,
  optionValue: PropTypes.string.isRequired,
};

SelectField.defaultProps = {
  optionText: 'name',
  optionValue: 'id',
};

export default SelectField;