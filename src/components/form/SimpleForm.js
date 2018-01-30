import React, { Component } from 'react';
import PropTypes from 'prop-types';
import mapValues from 'lodash/mapValues';
import get from 'lodash/get';
import pickBy from 'lodash/pickBy';
import isEqual from 'lodash/isEqual';
import isFunction from 'lodash/isFunction';
import has from 'lodash/has';
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

let data = {};

class SimpleForm extends Component {

  componentDidMount() {

    const { record } = this.props;

    this.parses = {};
    this.formats = {};
    React.Children.forEach(this.props.children, (child) => {
      if (child) {
        const { source, parse, format } = child.props;
        this.parses[source] = parse || defaultParse;
        this.formats[source] = format || defaultFormat;
      }
    });

    this.updateData(record);
  }

  componentWillReceiveProps(nextProps) {
    const { record } = this.props;
    if (nextProps.record && !isEqual(record, nextProps.record)) {
      this.updateData(nextProps.record);
    }
  }

  updateData = (record) => {
    const { form: { setFieldsValue, getFieldsValue } } = this.props;
    const initValues = mapValues(record || {}, (value, source) => {
      const format = get(this.formats, source);
      return format ? format(value) : value;
    });

    const fields = getFieldsValue();

    data = pickBy(initValues, (value, key) => has(fields, key));

    setFieldsValue(data);
  };

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
  onValuesChange(props, values) {
    data = { ...data, ...values };
    if (isFunction(props.onChange)) {
      props.onChange(data);
    }
    if (isFunction(props.onFieldChange)) {
      props.onFieldChange(values);
    }
  }
})(SimpleForm);