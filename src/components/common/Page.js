import React from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import { connect } from 'mirrorx';

const loadingStyle = {
  height: 'calc(100vh - 184px)',
  overflow: 'hidden',
};

const Page = ({ children, header, loading, style }) => (
  <div>
    { header }
    <Spin spinning={loading}>
      <div style={loading ? { ...style, ...loadingStyle } : style}>
        {children}
      </div>
    </Spin>
  </div>
);

Page.propTypes = {
  header: PropTypes.element,
  loading: PropTypes.bool,
  style: PropTypes.object,
};

export default connect(({loading}) => ({
  loading
}))(Page);