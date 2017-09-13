import React from 'react';
import { Icon } from 'antd';
import { actions } from 'mirrorx';
import "./style.css";

const AppBar = ({ collapsed, title }) => (
  <div className="app-bar">
    <Icon
      className="trigger"
      type={collapsed ? "menu-unfold" : "menu-fold"}
      onClick={actions.collapsed.toggle}
    />
    {title}
  </div>
);

export default AppBar;