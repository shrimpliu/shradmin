import React, { Component } from 'react';
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

const Title = () => (
  <div>
    <span>登录</span>
  </div>
);

class Login extends Component {

  handleSubmit = () => {
    const { form: { validateFieldsAndScroll } } = this.props;
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return;
      }
      actions.auth.login(values);
    });
  };

  render() {

    const { loading, form: { getFieldDecorator } } = this.props;

    return(
      <div style={styles.container}>
        <Card title={<Title/>} style={styles.card}>
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
              <Button size="large" type="primary" loading={loading} onClick={this.handleSubmit} style={styles.button}>登录</Button>
            </Row>
          </form>
        </Card>
      </div>
    )

  }

}



export default connect(({loading}) => ({
  loading
}))(
  Form.create()(Login)
);