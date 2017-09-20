import React from 'react';
import { Row, Col } from 'antd';
import { RefreshButton, ListButton, EditButton, RemoveButton } from '../buttons';

const ShowActions = ({ model, record, refresh, hasEdit, hasList, hasDelete }) => (
  <Row type="flex" gutter={16} justify="end">
    {hasDelete &&
    <Col>
      <RemoveButton model={model} record={record}/>
    </Col>
    }
    {hasEdit &&
    <Col>
      <EditButton model={model} record={record}/>
    </Col>
    }
    {hasList &&
    <Col>
      <ListButton model={model}/>
    </Col>
    }
    <Col>
      <RefreshButton refresh={refresh}/>
    </Col>
  </Row>
);

export default ShowActions;