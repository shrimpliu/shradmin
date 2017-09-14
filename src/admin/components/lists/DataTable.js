import React from 'react';
import { Table } from 'antd';

const DataTable = ({ model, data, children, translate, rowKey = "id", ...rest }) => {

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
      <Table {...rest} rowKey={rowKey} dataSource={data} columns={columns} />
    </div>
  );

};

export default DataTable;