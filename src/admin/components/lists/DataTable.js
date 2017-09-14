import React from 'react';
import { Table } from 'antd';
import { translate } from '../../i18n';

const DataTable = ({ model, data, children, translate, rowKey = "id" }) => {

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
      <Table rowKey={rowKey} dataSource={data} columns={columns}/>
    </div>
  );

};

export default translate(DataTable);