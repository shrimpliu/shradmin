import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon } from 'antd';
import { actions, connect } from 'mirrorx';
import compose from 'recompose/compose';
import split from 'lodash/split';
import { translate } from '../../i18n';
const MenuItem = Menu.Item;

const handleMenuClick = ({ key }) => {
  switch (key) {
    case "home":
      actions.routing.push("/");
      break;
    case "logout":
      actions.auth.logout();
      break;
    default:
      actions.routing.push(`/${key}`);
      break;
  }
};

const AppMenu = ({ models, selectedKey, translate }) => (
  <Menu mode="inline" onClick={handleMenuClick} defaultSelectedKeys={[selectedKey]}>
    <MenuItem key="home">
      <Icon type="home"/>
      <span>{translate("page.home")}</span>
    </MenuItem>
    {models.map(({ name, icon }) => (
      <MenuItem key={name}>
        {React.createElement(icon)}
        <span>{translate(`models.${name}.name`)}</span>
      </MenuItem>
    ))}
    <MenuItem key="logout">
      <Icon type="logout"/>
      <span>{translate("auth.logout")}</span>
    </MenuItem>
  </Menu>
);

AppMenu.propTypes = {
  models: PropTypes.array,
};

const getSelectedKey = ({ pathname }) => {
  const keys = split(pathname, "/", 2);
  return keys[1] || "home";
};

const enhance = compose(
  connect(({routing: {location}}) => ({
    selectedKey: getSelectedKey(location),
  })),
  translate,
);

export default enhance(AppMenu);