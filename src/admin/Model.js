import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';

const Model = () => (
  <span></span>
);

Model.defaultProps = {
  icon: () => <Icon type="bars"/>,
};

const componentPropType = PropTypes.oneOfType([PropTypes.func, PropTypes.string]);

Model.propTypes = {
  name: PropTypes.string.isRequired,
  list: componentPropType,
  icon: componentPropType,
};

export default Model;