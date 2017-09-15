import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';

const DataTable = ({ model, data, children, translate, rowKey, params, total, changePage, ...rest }) => {

  const columns = React.Children.map(children, (child, index) => ({
    title: translate(`models.${model}.fields.${child.props.name}`),
    dataIndex: child.props.name,
    key: index,
    render: (value, record) => React.cloneElement(child, {
      record
    })
  }));

  return (
    <div style={{margin: "16px 0"}}>
      <Table
        {...rest}
        rowKey={rowKey}
        dataSource={data}
        columns={columns}
        pagination={{
          total,
          current: parseInt(params._page, 10),
          pageSize: parseInt(params._limit, 10),
          onChange: changePage,
        }}
      />
    </div>
  );

};

DataTable.defaultProps = {
  data: [],
  rowKey: "id",
  params: {},
  total: 0,
};

DataTable.propTypes = {
  model: PropTypes.string,
  data: PropTypes.array,
  translate: PropTypes.func,
  rowKey: PropTypes.string,
  params: PropTypes.object,
  total: PropTypes.number,
  changePage: PropTypes.func,
};

export default DataTable;