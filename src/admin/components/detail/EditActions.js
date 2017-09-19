import React from 'react';
import { Row, Col } from 'antd';
import { ListButton, ShowButton } from '../buttons';

const EditActions = ({ model, record }) => (
  <Row type="flex" gutter={16} justify="end">
    <Col>
      <ShowButton model={model} record={record} />
    </Col>
    <Col>
      <ListButton model={model} />
    </Col>
  </Row>
);

export default EditActions;