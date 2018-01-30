import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Form, Row, Input, Button } from 'antd';
import compose from 'recompose/compose';
import { actions, connect } from 'mirrorx';
import { translate } from '../../i18n';
const FormItem = Form.Item;

const styles = {
  container: {
    display: "flex",
    flexDirection: 'column',
    minHeight: "100vh",
    alignItems: "center",
    justifyContent: "center"
  },
  card: {
    minWidth: 300
  },
  button: {
    width: "100%"
  }
};

const Title = ({translate}) => (
  <div>
    <span>{translate("auth.login")}</span>
  </div>
);

class Login extends Component {

  handleSubmit = e => {
    e.preventDefault();
    const { form: { validateFieldsAndScroll } } = this.props;
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return;
      }
      actions.auth.login(values);
    });
  };

  render() {

    const { loading, translate, form: { getFieldDecorator } } = this.props;

    return(
      <div style={styles.container}>
        <Card title={<Title translate={translate} />} style={styles.card}>
          <form onSubmit={this.handleSubmit}>
            <FormItem hasFeedback>
              {getFieldDecorator('username', {
                rules: [{
                  required: true
                }]
              })(
                <Input size="large" placeholder="username"/>
              )}
            </FormItem>
            <FormItem hasFeedback>
              {getFieldDecorator('password', {
                rules: [{
                  required: true
                }]
              })(
                <Input size="large" type="password" placeholder="password"/>
              )}
            </FormItem>
            <Row>
              <Button size="large" type="primary" htmlType="submit" loading={loading} onClick={this.handleSubmit} style={styles.button}>
                {translate("auth.login")}
              </Button>
            </Row>
          </form>
        </Card>
      </div>
    )

  }
}

Login.contextTypes = {
  translate: PropTypes.func
};

const enhance = compose(
  connect(({loading}) => ({
    loading
  })),
  Form.create(),
  translate,
);

export default enhance(Login);