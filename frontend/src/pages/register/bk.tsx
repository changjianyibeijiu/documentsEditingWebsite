import React from 'react';
import styles from './index.less'
import request from '@/utils/request';
import { Link } from 'umi';

import {
    Form,
    Input,
    Tooltip,
    Icon,
    Checkbox,
    Button,
    message,
    Modal,
  } from 'antd';

  class RegistrationForm extends React.Component {
    state = {
      confirmDirty: false,
      autoCompleteResult: [],
    };
    constructor(props){
      super(props);
      this.state = {message: ''};
    }
    handleSubmit = e => {
      e.preventDefault();
      this.setState({message: ''});

      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          request.post('/register',{values}).then((data)=>{
            if(data.staus == 200){
              this.setState({message: '注册成功'});
                Modal.success({
                  content: '注册成功',
                });
              
            }
            else if(data.staus == 400){
              this.setState({message: '用户名重复，请更换用户名'});
              
            }
            else if(data.staus == 300){
              this.setState({message: '邮箱重复，请更换邮箱'});

            }
            else if(data.staus ==500){
              this.setState({message: '请重试'});
            }
          });

        }
      });
    };
  
    handleConfirmBlur = e => {
      const { value } = e.target;
      this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };
    agreement = (rule, value, callback) => {
        const { form } = this.props;
        console.log("检查");
        console.log(value);
        console.log(value&&value==false);
        if (value==false) {
          callback('请同意协议');
        } else {
          callback();
        }
      };
    

    compareToFirstPassword = (rule, value, callback) => {
      const { form } = this.props;
      if (value && value !== form.getFieldValue('password')) {
        callback('请输入相同密码');
      } else {
        callback();
      }
    };
  
    validateToNextPassword = (rule, value, callback) => {
      const { form } = this.props;
      if(value&&(value.length<8||value.length>16)){
        callback('请输入8至16位密码');
    }
      else{
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
          }
        callback();
    }
    };

  
    render() {
      const { getFieldDecorator } = this.props.form;

  
      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      };
      const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      };
 
      return (
        <div className={styles.formContainer}>
            <Form {...formItemLayout} className={styles.form} onSubmit={this.handleSubmit}>
            <div className = {styles.messageBox}>
          <div className={styles.message}>{this.state.message}</div>

        </div>
          <Form.Item label="邮箱">
            {getFieldDecorator('email', {
              rules: [
                {
                  type: 'email',
                  message: '请输入正确的邮箱格式',
                },
                {
                  required: true,
                  message: '请输入邮箱地址',
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="密码" hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: '请输入密码',
                },
                {
                  validator: this.validateToNextPassword,
                },
              ],
            })(<Input.Password />)}
          </Form.Item>
          <Form.Item label="确认密码" hasFeedback>
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: '再次输入你的密码',
                },
                {
                  validator: this.compareToFirstPassword,
                },
              ],
            })(<Input.Password onBlur={this.handleConfirmBlur} />)}
          </Form.Item>
          <Form.Item
            label={
              <span>
                名称&nbsp;
                <Tooltip title="你想让大家如何称呼你">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
          >
            {getFieldDecorator('nickname', {
              rules: [{ required: true, message: '输入注册名称!', whitespace: true }],
            })(<Input />)}
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            {getFieldDecorator('agreement', {
              valuePropName: 'checked',
              rules: [{ required: true, message: '请同意协议'},
              {
                validator: this.agreement,
              },
            ]
              
            })(
              <Checkbox>
                我以阅读 <a href="">协议</a>
              </Checkbox>,
            )}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" className={styles.loginFormButton}>
              注册
            </Button>
            <Link to="/login">已注册？</Link>

          </Form.Item>
        </Form>
        </div>
      );
    }
  }
  

export default RegistrationForm;