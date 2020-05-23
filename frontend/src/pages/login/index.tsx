import React, { Component } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styles from './index.less';

import request from '@/utils/request';
import { Link, history } from 'umi';
import { saveToken } from '@/utils/auth';

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = { message: '' };
  }

  onFinish = values => {
    //console.log('Received values of form: ', values);
    request.post('/login', { values }).then(response => {
      if (response.data.data.status == '8000') {
        //console.log('登录成功');
        this.setState({ message: '登录成功' });

        saveToken(response.headers.authorization);

        //console.log(localStorage.getItem('userToken'));

        history.push('/');
      } else if (response.data.data.status == '8001') {
        //console.log('用户名或密码错误');
        this.setState({ message: '用户名或密码错误' });
      } else {
        //console.log('登录失败');
        this.setState({ message: '登陆失败请重新登录' });
      }
    });
  };
  render() {
    return (
      <div>
        <Form
          name="normal_login"
          initialValues={{ remember: true }}
          onFinish={this.onFinish}
          onClick={() => this.setState({ message: '' })}
        >
          <Form.Item
            name="user"
            rules={[{ required: true, message: '请输入用户名/邮箱' }]}
          >
            <div className={styles.form}>
              <Input prefix={<UserOutlined />} placeholder="用户名/邮箱" />
              <div className={styles.message}>{this.state.message}</div>
            </div>
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: '请输入密码' },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (value && value.length < 6) {
                    return Promise.reject('请输入6位以上密码!');
                  }
                  return Promise.resolve();
                },
              }),
            ]}
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
            <Button type="primary" htmlType="submit" block>
              登陆
            </Button>
            {/* <div className={styles.loginFormRegister}>
            或 <a href="">立即注册！</a>
            </div> */}
          </Form.Item>
        </Form>
      </div>
    );
  }
}
