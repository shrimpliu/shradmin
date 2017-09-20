import React from 'react';
import { Row, Col } from 'antd';
import { ListButton } from '../buttons';

const CreateActions = ({ model, hasList }) => (
  <Row type="flex" gutter={16} justify="end">
    {hasList &&
      <Col>
        <ListButton model={model}/>
      </Col>
    }
  </Row>
);

export default CreateActions;