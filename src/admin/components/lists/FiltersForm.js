import React, { Component } from 'react';
import { Form, Row, Col } from 'antd';
import mapValues from 'lodash/mapValues';
import get from 'lodash/get';
import omitBy from 'lodash/omitBy';
import isNumber from 'lodash/isNumber';
import isEmpty from 'lodash/isEmpty';
import inflection from 'inflection';
const FormItem = Form.Item;

class FiltersForm extends Component {

  render() {

    const { children, model, translate, form: { getFieldDecorator } } = this.props;

    return (
      <Form>
        <Row gutter={16}>
          {React.Children.map(children, ({ props: { source, input, options } }, index) => (
            <Col key={index} span={6}>
              <FormItem
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                label={translate(`models.${model}.fields.${source}`, {
                  _: inflection.humanize(source)
                })}
                colon={false}>
                {getFieldDecorator(source, options)(input)}
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

    const formats = {};

    React.Children.forEach(props.children, ({ props: { source, format }}) => {
      formats[source] = format;
    });

    return mapValues(props.values, (value, source) => {

      const format = get(formats, source);

      return {
        value: format ? format(value) : value,
      };
    });
  },
  onValuesChange(props, values) {

    const parses = {};

    React.Children.forEach(props.children, ({ props: { source, parse }}) => {
      parses[source] = parse;
    });

    values = mapValues(values, (value, source) => {
      const parse = get(parses, source);
      return parse ? parse(value) : value;
    });

    props.setFilters(omitBy(values, value => isEmpty(value) && !isNumber(value) ));
  },
})(FiltersForm);