import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import styles from './index.less';
import request from '@/utils/request';
import { Link } from 'umi';

class NormalLoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: '' };
  }
  handleSubmit = e => {
    e.preventDefault();
    this.setState({ message: '' });
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        request.post('/login', { values }).then(data => {
          console.log(data);
          if (data.staus == 700) {
            console.log('登录成功');
            this.setState({ message: '登录成功' });
            console.log(localStorage.getItem('Admin-Token'));
            window.location.href = '/home';
          } else if (data.staus == 600) {
            console.log('用户名或密码错误');
            this.setState({ message: '用户名或密码错误' });
          } else {
            console.log('登录失败');
            this.setState({ message: '注册失败请重新登录' });
          }
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.formContainer}>
        <Form onSubmit={this.handleSubmit} className={styles.loginForm}>
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入用户名！' }],
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="用户名/邮箱"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码！' }],
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type="password"
                placeholder="密码"
              />,
            )}
          </Form.Item>
          <div className={styles.messageBox}>
            <div className={styles.message}>{this.state.message}</div>
          </div>

          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox>记住密码</Checkbox>)}
            <a className={styles.loginFormForgot} href="">
              忘记密码？
            </a>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.loginFormButton}
            >
              登录
            </Button>
            或者 <Link to="/register">立即注册!</Link>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default NormalLoginForm;
