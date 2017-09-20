import React, { Component } from 'react';
import PropTypes from 'prop-types';
import mapValues from 'lodash/mapValues';
import get from 'lodash/get';
import { Form, Button } from 'antd';
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    lg: { span: 3 },
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    lg: { span: 6 },
    xs: { span: 24 },
    sm: { span: 12 },
  },
};

const buttonLayout = {
  wrapperCol: {
    lg: { span: 6, offset: 3, },
    xs: { span: 24, offset: 0, },
    sm: { span: 12, offset: 4, },
  },
};

class SimpleForm extends Component {

  componentDidMount() {
    this.parses = {};
    React.Children.forEach(this.props.children, ({ props: { source, parse }}) => {
      this.parses[source] = parse;
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { save } = this.props;
    this.props.form.validateFieldsAndScroll((error, values) => {
      if (!error) {
        values = mapValues(values, (value, source) => {
          const parse = get(this.parses, source);
          return parse ? parse(value) : value;
        });
        save(values);
      }
    });

  };

  render() {

    const { children, model, translate, form: { getFieldDecorator } } = this.props;

    return (
      <Form
        onSubmit={this.handleSubmit}>
        {React.Children.map(children, ({ props: { source, input, options } }, index) => (
          <FormItem key={index} {...formItemLayout} label={translate(`models.${model}.fields.${source}`)} colon={false}>
            {getFieldDecorator(source, options)(input)}
          </FormItem>
        ))}
        <FormItem {...buttonLayout}>
          <Button type="primary" htmlType="submit">
            {translate('actions.save')}
          </Button>
        </FormItem>
      </Form>
    );
  }

}

SimpleForm.propTypes = {
  model: PropTypes.string.isRequired,
  save: PropTypes.func,
  record: PropTypes.object,
};

export default Form.create({
  mapPropsToFields(props) {
    const formats = {};

    React.Children.forEach(props.children, ({ props: { source, format }}) => {
      formats[source] = format;
    });

    return mapValues(props.record || {}, (value, source) => {
      const format = get(formats, source);
      return {
        value: format ? format(value) : value,
      };
    });
  },
})(SimpleForm);