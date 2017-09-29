import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Row, Col } from 'antd';
import { actions } from 'mirrorx';

const style = {
  bar: {
    display: "flex"
  },
  leftTitle: {
    fontSize: "18px",
    lineHeight: "64px",
  },
  trigger: {
    padding: "0 16px",
    cursor: "pointer",
    transition: "color .3s",
  },
  userMenu: {
    float: "right",
    paddingRight: "2em",
  }
};

const AppBar = ({ collapsed, title, translate, userMenu }) => (
  <Row type="flex" justify="space-between">
    <Col style={style.leftTitle} >
      <Icon
        style={style.trigger}
        type={collapsed ? "menu-unfold" : "menu-fold"}
        onClick={actions.collapsed.toggle}
      />
      {title}
    </Col>
    {userMenu &&
    <Col style={style.userMenu}>
      {React.cloneElement(userMenu, {
        translate,
      })}
    </Col>}
  </Row>
);

AppBar.propTypes = {
  userMenu: PropTypes.node,
};

export default AppBar;