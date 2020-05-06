// import React from 'react';
import { Form, Input, Tooltip, Checkbox, Button } from 'antd';

import {
  UserOutlined,
  LockOutlined,
  QuestionCircleOutlined,
  MailOutlined
} from '@ant-design/icons';

import React, { Component } from 'react'

export default class index extends Component {


  render() {
    return (
      <div>
        
      </div>
    )
  }
}


const RegistrationForm = () => {
  const [form] = Form.useForm();

  const onFinish = values => {
    console.log('Received values of form: ', values);
  };

  return (
    <Form form={form} name="register" onFinish={onFinish} scrollToFirstError>
      <Form.Item
        name="nickname"
        
        rules={[
          { required: true, message: '请输入用户名！', whitespace: true },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="用户名"
        />
      </Form.Item>
      <Form.Item
        name="email"
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
        <Input
          prefix={<MailOutlined className="site-form-item-icon" />}
          placeholder="邮箱"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: '请输入密码!',
          },
        ]}
        hasFeedback
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="密码"
        />
      </Form.Item>
      
      <Form.Item
        name="confirm"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: '请输入密码!',
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
          prefix={<LockOutlined className="site-form-item-icon" />}
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
              value
                ? Promise.resolve()
                : Promise.reject('Should accept agreement'),
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
};

// ReactDOM.render(<RegistrationForm />, mountNode);
// export default RegistrationForm;
