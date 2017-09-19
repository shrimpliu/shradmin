import React from 'react';
import { Row, Col } from 'antd';
import { RefreshButton, ListButton, EditButton } from '../buttons';

const ShowActions = ({ model, record, refresh }) => (
  <Row type="flex" gutter={16} justify="end">
    <Col>
      <EditButton model={model} record={record}/>
    </Col>
    <Col>
      <ListButton model={model} />
    </Col>
    <Col>
      <RefreshButton refresh={refresh}/>
    </Col>
  </Row>
);

export default ShowActions;