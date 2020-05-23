// import React from 'react';
import { Form, Input, Tooltip, Checkbox, Button, Modal } from 'antd';

import {
  UserOutlined,
  LockOutlined,
  QuestionCircleOutlined,
  ExclamationCircleOutlined,
  MailOutlined,
} from '@ant-design/icons';

import React, { Component } from 'react';
import request from '@/utils/request';
import { history } from 'umi';
const { confirm } = Modal;
import styles from './index.less';

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = { umessage: '', emessage: '', tmessage: '' };
  }

  showConfirm = () => {
    confirm({
      title: '注册成功，立即登陆？',
      icon: <ExclamationCircleOutlined />,
      cancelText: '取消',
      okText: '立即登陆',
      onOk() {
        history.push('/account/login');
      },
      onCancel() {
        return false;
      },
    });
  };

  onFinish = values => {
    //console.log('Received values of form: ', values);
    request.post('/register', { values }).then(response => {
      if (response.data.data.status == '9000') {
        //console.log('注册成功');
        //console.log(this);
        this.setState({ message: '注册成功' });

        this.showConfirm();
      } else if (response.data.data.status == '9001') {
        //console.log('用户名重复');
        this.setState({ umessage: '用户名以使用，请更换用户名' });
      } else if (response.data.data.status == '9002') {
        //console.log('邮箱重复');
        this.setState({ emessage: '邮箱以使用，请更换邮箱' });
      } else {
        //console.log('错误');
        this.setState({ umessage: '未知错误，请重试！' });
      }
    });
  };

  render() {
    return (
      <Form
        name="register"
        onFinish={this.onFinish}
        scrollToFirstError
        onClick={() => {
          this.setState({ umessage: '', emessage: '', tmessage: '' });
        }}
      >
        <Form.Item
          name="userName"
          rules={[
            { required: true, message: '请输入用户名！', whitespace: true },
          ]}
        >
          <div className={styles.form}>
            <Input prefix={<UserOutlined />} placeholder="用户名" />
            <div className={styles.message}>{this.state.umessage}</div>
          </div>
        </Form.Item>
        <Form.Item
          name="userEmail"
          rules={[
            {
              type: 'email',
              message: '请输入正确邮箱地址!',
            },
            {
              required: true,
              message: '请输入邮箱!',
            },
          ]}
        >
          <div className={styles.form}>
            <Input prefix={<MailOutlined />} placeholder="邮箱" />
            <div className={styles.message}>{this.state.emessage}</div>
          </div>
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: '请输入密码!',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (value && value.length < 6) {
                  return Promise.reject('请输入6位以上密码!');
                }
                return Promise.resolve();
              },
            }),
          ]}
          hasFeedback
        >
          <Input prefix={<LockOutlined />} type="password" placeholder="密码" />
        </Form.Item>

        <Form.Item
          name="confirm"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: '请确认密码!',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('两次输入密码不同!');
              },
            }),
          ]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="再次输入密码"
          />
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject('需要同意用户协议'),
            },
          ]}
        >
          <Checkbox>
            同意并加入<a href="">《用户协议》</a>
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            注册
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
