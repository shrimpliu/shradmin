import React from 'react';
import { Row, Col } from 'antd';
import { RefreshButton, ListButton } from '../buttons';

const ShowActions = ({ model, refresh }) => (
  <Row type="flex" gutter={16} justify="end">
    <Col>
      <ListButton model={model} />
    </Col>
    <Col>
      <RefreshButton refresh={refresh}/>
    </Col>
  </Row>
);

export default ShowActions;