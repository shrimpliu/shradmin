import React, { Component } from 'react';
import PropTypes from 'prop-types';
import mapValues from 'lodash/mapValues';
import get from 'lodash/get';
import inflection from 'inflection';
import { Form, Button } from 'antd';
const FormItem = Form.Item;

const buttonLayout = {
  wrapperCol: {
    lg: { span: 6, offset: 3, },
    xs: { span: 24, offset: 0, },
    sm: { span: 12, offset: 4, },
  },
};

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

const defaultFormat = value => value;
const defaultParse = value => value;

class SimpleForm extends Component {

  componentDidMount() {
    this.parses = {};
    React.Children.forEach(this.props.children, (child) => {
      if (child) {
        const {source, parse} = child.props;
        this.parses[source] = parse || defaultParse;
      }
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

    const { children, model, record, translate, form: { getFieldDecorator } } = this.props;

    return (
      <Form
        onSubmit={this.handleSubmit}>
        {React.Children.map(children, (child, index) => {
          if (child) {
            const {source, input, options, layoutSpan} = child.props;
            return (
              <FormItem key={index} {...formItemLayout} {...layoutSpan}
                        label={translate(`models.${model}.fields.${source}`, {_: inflection.humanize(source)})}
                        colon={false}>
                {input ?
                  getFieldDecorator(source, options)(input) :
                  React.cloneElement(child, {
                    record
                  })
                }
              </FormItem>
            );
          }
          return null;
        })}
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

    React.Children.forEach(props.children, (child) => {
      if (child) {
        const {source, format} = child.props;
        formats[source] = format || defaultFormat;
      }
    });

    return mapValues(props.record || {}, (value, source) => {
      const format = get(formats, source);
      return {
        value: format ? format(value) : value,
      };
    });
  },
})(SimpleForm);