import React from 'react';
import { Spin } from 'antd';
import { connect } from 'mirrorx';

const loadingStyle = {
  height: 'calc(100vh - 184px)',
  overflow: 'hidden',
};

const Page = ({ children, loading, style }) => (
  <Spin spinning={loading}>
    <div style={loading ? { ...style, ...loadingStyle } : style}>
      {children}
    </div>
  </Spin>
);

export default connect(({loading}) => ({
  loading
}))(Page);