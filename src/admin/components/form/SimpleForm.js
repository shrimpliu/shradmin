import React, { Component } from 'react';
import PropTypes from 'prop-types';
import mapValues from 'lodash/mapValues';
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

  handleSubmit = (e) => {
    e.preventDefault();
    const { save } = this.props;
    this.props.form.validateFieldsAndScroll((error, values) => {
      if (!error) {
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
    return mapValues(props.record || {}, value => ({ value }));
  },
})(SimpleForm);