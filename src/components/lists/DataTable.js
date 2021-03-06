import React from 'react';
import PropTypes from 'prop-types';
import inflection from 'inflection';
import { Table } from 'antd';

const DataTable = ({ model, data, children, translate, rowKey, params, total, setParams, ...rest }) => {

  const columns = [];
  React.Children.forEach(children, (child, index) => {
    if (child) {
      const { source, columnProps } = child.props;
      columns.push({
        title: source ? translate(`models.${model}.fields.${source}`, {_: inflection.humanize(source)}) : "",
        dataIndex: source,
        key: index,
        render: (value, record) => React.cloneElement(child, {
          record,
          model,
        }),
        ...columnProps,
      });
    }
  });

  const handleChange = (pagination, filters, sorter) => {
    const newParams = {
      _page: pagination.current,
      _limit: pagination.pageSize,
    };
    if (sorter.field && sorter.order !== false) {
      newParams._sort = sorter.field;
      newParams._order = sorter.order === "descend" ? "desc" : "asc";
    } else {
      newParams._sort = null;
      newParams._order = "asc";
    }
    setParams(newParams);
  };

  return (
    <div style={{margin: "16px 0"}}>
      <Table
        {...rest}
        rowKey={rowKey}
        dataSource={data}
        columns={columns}
        onChange={handleChange}
        pagination={{
          total,
          current: parseInt(params._page, 10),
          pageSize: parseInt(params._limit, 10),
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
  setParams: PropTypes.func,
};

export default DataTable;