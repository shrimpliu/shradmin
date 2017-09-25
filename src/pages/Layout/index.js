import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'mirrorx';
import { Layout } from 'antd';
import DefaultAppBar from '../AppBar';
import Breadcrumb from '../Breadcrumb';
const { Sider, Header, Content, Footer } = Layout;

const style = {
  container: {
    minHeight: "100vh"
  },
  header: {
    background: "#fff",
    padding: 0,
    borderBottom: "thin solid #d9d9d9",
    lineHeight: "64px"
  },
  sider: {
    background: "#fff",
  },
  content: {
    margin: "0px 16px"
  },
  body: {
    padding: "24px",
    background: "#fff",
    minHeight: "90vh"
  },
  footer: {
    textAlign: "center"
  }
};

const AppLayout = ({ title, menu, routes, collapsed }) => (
  <Layout style={style.container}>
    <Header style={style.header}>
      <DefaultAppBar title={title} collapsed={collapsed}/>
    </Header>
    <Layout>
      <Sider style={style.sider} collapsible trigger={null} collapsed={collapsed}>
        {menu}
      </Sider>
      <Layout>
        <Content style={style.content}>
          <Breadcrumb className="breadcrumb"/>
          <div style={style.body}>
            {routes}
          </div>
        </Content>
        <Footer style={style.footer}>
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