import React from 'react';
import PropTypes from 'prop-types';
import inflection from 'inflection';
import { Row, Col } from 'antd';

const styles = {
  row: {
    paddingTop: "2em"
  },
  label: {
    fontWeight: "bold",
    color: "#5a5a5a",
    fontSize: "10pt",
  }
};

const SimpleShowLayout = ({ children, model, record, translate, labelStyle, labelCol, wrapperCol }) => (
  <div>
    {React.Children.map(children, (child, index) => child && (
      <Row key={index} style={styles.row}>
        <Col style={{...styles.label, ...labelStyle}} {...labelCol}>
          <span>{translate(`models.${model}.fields.${child.props.source}`, {_: inflection.humanize(child.props.source)})}</span>
        </Col>
        <Col {...wrapperCol}>
          {React.cloneElement(child, {
            record,
          })}
        </Col>
      </Row>
    ))}
  </div>
);

SimpleShowLayout.propTypes = {
  labelStyle: PropTypes.object,
  labelCol: PropTypes.object,
  wrapperCol: PropTypes.object,
};

SimpleShowLayout.defaultProps = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

export default SimpleShowLayout;