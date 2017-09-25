import React from 'react';
import { Row, Col } from 'antd';
import { ListButton, ShowButton, BackButton } from '../buttons';

const EditActions = ({ model, record, hasShow, hasList }) => (
  <Row type="flex" gutter={16} justify="end">
    <Col>
      <BackButton />
    </Col>
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