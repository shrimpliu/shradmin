import React from 'react';
import { Row, Col } from 'antd';
import { RefreshButton, CreateButton } from "../buttons";

const Actions = ({ refresh, model, hasCreate }) => {

  return (
    <Row type="flex" gutter={16} justify="end">
      {hasCreate &&
      <Col>
        <CreateButton model={model}/>
      </Col>
      }
      <Col>
        <RefreshButton refresh={refresh}/>
      </Col>
    </Row>
  );

};

export default Actions;