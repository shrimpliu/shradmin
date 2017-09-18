import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

const TextInput = ({source, model, translate, ...rest}) => {

  return (
    <Input
      placeholder={translate(`models.${model}.fields.${source}`)}
      {...rest}/>
  );
};

TextInput.propTypes = {
  source: PropTypes.string.isRequired,
  translate: PropTypes.func,
};

export default TextInput;

