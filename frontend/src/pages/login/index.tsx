import React, { Component } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styles from './index.less'


export default class index extends Component {
  onFinish(values) {
    console.log('Received values of form: ', values);
  }
  render() {
    return (
      <div>
        <Form
          name="normal_login"
          initialValues={{ remember: true }}
          onFinish={this.onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名/邮箱' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="用户名/邮箱"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="密码"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>记住账号</Checkbox>
            </Form.Item>

            <a className={styles.loginFormForgot} href="">
              忘记密码
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              
              block
            >
              登陆
            </Button>
            <div className={styles.loginFormRegister}>
            或 <a href="">立即注册！</a>
            </div>
            
          </Form.Item>
        </Form>
      </div>
    );
  }
}
