import React from 'react';
import { Row, Col } from 'antd';
import { ListButton, ShowButton } from '../buttons';

const EditActions = ({ model, record, hasShow, hasList }) => (
  <Row type="flex" gutter={16} justify="end">
    {hasShow &&
      <Col>
        <ShowButton model={model} record={record}/>
      </Col>
    }
    {hasList &&
      <Col>
        <ListButton model={model}/>
      </Col>
    }
  </Row>
);

export default EditActions;