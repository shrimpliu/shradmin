import React from 'react';
import { Row, Col } from 'antd';
import { ListButton } from '../buttons';

const CreateActions = ({ model }) => (
  <Row type="flex" gutter={16} justify="end">
    <Col>
      <ListButton model={model} />
    </Col>
  </Row>
);

export default CreateActions;