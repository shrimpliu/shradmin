import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

export const removeTags = input => input ? input.replace(/<[^>]+>/gm, '') : '';

const RichTextField = ({ source, record = {}, stripTags, elStyle }) => {
  const value = get(record, source);
  if (stripTags) {
    return <div style={elStyle}>{removeTags(value)}</div>;
  }

  return <div style={elStyle} dangerouslySetInnerHTML={{ __html: value }}></div>;
};

RichTextField.propTypes = {
  elStyle: PropTypes.object,
  record: PropTypes.object,
  source: PropTypes.string.isRequired,
  stripTags: PropTypes.bool,
};


RichTextField.defaultProps = {
  stripTags: false,
};

export default RichTextField;