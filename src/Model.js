import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';

const Model = () => (
  <span></span>
);

Model.defaultProps = {
  icon: () => <Icon type="bars"/>,
  hasDelete: false,
};

const componentPropType = PropTypes.oneOfType([PropTypes.func, PropTypes.string]);

Model.propTypes = {
  name: PropTypes.string.isRequired,
  list: componentPropType,
  icon: componentPropType,
  show: componentPropType,
  edit: componentPropType,
  create: componentPropType,
  hasDelete: PropTypes.bool,
};

export default Model;