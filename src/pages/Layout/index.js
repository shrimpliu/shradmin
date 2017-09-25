import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'mirrorx';
import { Layout } from 'antd';
import DefaultAppBar from '../AppBar';
import Breadcrumb from '../Breadcrumb';
import "./style.css";

const { Sider, Header, Content, Footer } = Layout;

const AppLayout = ({ title, menu, routes, collapsed }) => (
  <Layout className="container">
    <Header className="header">
      <DefaultAppBar title={title} collapsed={collapsed}/>
    </Header>
    <Layout>
      <Sider className="sider" collapsible trigger={null} collapsed={collapsed}>
        {menu}
      </Sider>
      <Layout>
        <Content className="content">
          <Breadcrumb className="breadcrumb"/>
          <div className="body">
            {routes}
          </div>
        </Content>
        <Footer className="footer">
          <span>{`${title} ©2017 Created by `}</span><a href="https://github.com/shrimpliu/shradmin" target="__blank">Shradmin</a>
        </Footer>
      </Layout>
    </Layout>
  </Layout>
);

AppLayout.defaultProps = {

};

AppLayout.propTypes = {
  title: PropTypes.node.isRequired,

};

export default connect(({ collapsed }) => ({
  collapsed,
}))(AppLayout);