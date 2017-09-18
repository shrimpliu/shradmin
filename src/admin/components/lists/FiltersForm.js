import React, { Component } from 'react';
import { Form, Row, Col } from 'antd';
import mapValues from 'lodash/mapValues';
import omitBy from 'lodash/omitBy';
import isEmpty from 'lodash/isEmpty';
const FormItem = Form.Item;

class FiltersForm extends Component {

  render() {

    const { children, model, translate, form: { getFieldDecorator } } = this.props;

    return (
      <Form>
        <Row gutter={16}>
          {React.Children.map(children, (child, index) => (
            <Col key={index} span={6}>
              <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label={translate(`models.${model}.fields.${child.props.source}`)} colon={false}>
                {getFieldDecorator(child.props.source, child.props.rules || {})(
                  React.cloneElement(child, {
                    model,
                    translate,
                  })
                )}
              </FormItem>
            </Col>
          ))}
        </Row>
      </Form>
    );
  }
}

export default Form.create({
  mapPropsToFields(props) {
    return mapValues(props.values, value => ({ value }));
  },
  onValuesChange(props, values) {
    props.setFilters(omitBy(values, isEmpty));
  },
})(FiltersForm);