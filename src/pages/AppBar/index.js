import React from 'react';
import { Icon } from 'antd';
import { actions } from 'mirrorx';

const style = {
  bar: {
    fontSize: "18px",
    lineHeight: "64px",
  },
  trigger: {
    padding: "0 16px",
  cursor: "pointer",
  transition: "color .3s",
  }
};

const AppBar = ({ collapsed, title }) => (
  <div style={style.bar}>
    <Icon
      style={style.trigger}
      type={collapsed ? "menu-unfold" : "menu-fold"}
      onClick={actions.collapsed.toggle}
    />
    {title}
  </div>
);

export default AppBar;