import React from 'react';
import { Row, Col } from 'antd';
import { ListButton, BackButton } from '../buttons';

const CreateActions = ({ model, hasList }) => (
  <Row type="flex" gutter={16} justify="end">
    <Col>
      <BackButton />
    </Col>
    {hasList &&
      <Col>
        <ListButton model={model}/>
      </Col>
    }
  </Row>
);

export default CreateActions;