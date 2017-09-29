import React from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import { connect, actions } from 'mirrorx';

const handleMenuClick = ({ key }) => {
  switch (key) {
    case "logout":
      actions.auth.logout();
      break;
  }
};

const RightMenu = ({ translate, name }) => (
  <Dropdown overlay={
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="logout">
        <span>{translate('page.logout')}</span>
      </Menu.Item>
    </Menu>
  }>
    <span><Icon type="user"/> {name}</span>
  </Dropdown>
);

export default connect(state => ({
  name: state.auth.info.name || state.auth.login.username,
}))(RightMenu);