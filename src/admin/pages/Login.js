import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Form, Row, Input, Button } from 'antd';
import { actions, connect } from 'mirrorx';
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

  handleSubmit = () => {
    const { translate } = this.context;
    const { form: { validateFieldsAndScroll } } = this.props;
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return;
      }
      actions.auth.login({params: values, translate});
    });
  };

  render() {

    const { loading, form: { getFieldDecorator } } = this.props;
    const { translate } = this.context;

    return(
      <div style={styles.container}>
        <Card title={<Title translate={translate}/>} style={styles.card}>
          <form>
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
              <Button size="large" type="primary" loading={loading} onClick={this.handleSubmit} style={styles.button}>
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

export default connect(({loading}) => ({
  loading
}))(
  Form.create()(Login)
);