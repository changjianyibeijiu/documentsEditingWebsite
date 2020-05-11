import React, { Component } from 'react';
import styles from './index.less';
import { Avatar, Upload, message, Button, Input, notification } from 'antd';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';
import request from '@/utils/request';
import { readToken, reMoveToken } from '@/utils/auth';
import isEmail from '@/utils/isemail';
import { history } from 'umi';

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      userEmail: '',
      avatar: '',
      display: false,
      password: '',
      name: '',
      email: '',
    };
  }
  //  display(props) {
  //   if (props.display) {
  //     return ;
  //   }
  //   return <GuestGreeting />;
  // }

  openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message,
    });
  };

  change = info => {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      request.get('/currentUser').then(response => {
        this.setState({
          userName: response.data.data.userName,
          userEmail: response.data.data.userEmail,
          avatar: response.data.data.avatar,
        });
        console.log(response.data.data);
      });
      message.success(`头像上传成功`);
    } else if (info.file.status === 'error') {
      message.error(`头像上传失败`);
    }
  };

  upInfo = () => {
    if (isEmail(this.state.userEmail)) {
      if (this.state.userName) {
        request
          .post('/userCenter/userInfo', {
            userName: this.state.userName,
            userEmail: this.state.userEmail,
          })
          .then(response => {
            console.log(response);
            if (response.data.data.status == '9001') {
              this.openNotificationWithIcon(
                'error',
                '用户名已被使用，请更换用户名',
              );
            } else if (response.data.data.status == '9002') {
              this.openNotificationWithIcon(
                'error',
                '邮箱已被使用，请更换邮箱',
              );
            } else {
              this.openNotificationWithIcon(
                'success',
                response.data.data.messege,
              );
              request.get('/currentUser').then(response => {
                this.setState({
                  userName: response.data.data.userName,
                  userEmail: response.data.data.userEmail,
                  name: response.data.data.userName,
                  email: response.data.data.userEmail,
                  avatar: response.data.data.avatar,
                });
                console.log(response.data.data);
              });
            }
          });
      } else {
        this.openNotificationWithIcon('error', '请输入有效名称');
      }
    } else {
      this.openNotificationWithIcon('error', '请输入有效邮箱地址');
    }
  };

  upPassword = () => {
    this.setState({ display: !this.state.display });
    if (this.state.display) {
      if (this.state.password.length >= 6) {
        request
          .post('/userCenter/userPassword', { password: this.state.password })
          .then(response => {
            console.log(response.data.data.messege);
            this.openNotificationWithIcon(
              'success',
              response.data.data.messege,
            );
            setTimeout(() => {
              reMoveToken();
              history.push('/account/login');
            }, 1000);
          });
      } else {
        this.openNotificationWithIcon('error', '请输入六位或以上密码');
        this.setState({ display: true });
      }
    }
  };

  componentDidMount() {
    console.log('以加载');
    request.get('/currentUser').then(response => {
      this.setState({
        userName: response.data.data.userName,
        userEmail: response.data.data.userEmail,
        name: response.data.data.userName,
        email: response.data.data.userEmail,
        avatar: response.data.data.avatar,
      });
      console.log(response.data.data);
    });
  }
  render() {
    return (
      <div
        className={styles.box}
        onClick={() => {
          this.setState({ display: false });
        }}
      >
        <div className={styles.main}>
          <div className={styles.userInfo}>
            <div className={styles.upAvatars}>
              <Avatar size={200} src={this.state.avatar} />
              <br />
              <Upload
                action="/api/userCenter/avatar"
                headers={{ authorization: readToken() }}
                onChange={this.change}
                showUploadList={false}
              >
                <Button block type="primary">
                  更换头像
                </Button>
              </Upload>
              ,
            </div>
            <div className={styles.personInfo}>
              <div className={styles.userName}>{this.state.name}</div>
              <div className={styles.userEmail}>{this.state.email}</div>
            </div>
          </div>
          <div className={styles.updateUserInfo}>
            <div>
              <div className={styles.input}>
                <Input
                  addonBefore="用户名"
                  defaultValue={this.state.userName}
                  value={this.state.userName}
                  onChange={e => this.setState({ userName: e.target.value })}
                ></Input>
              </div>
              <div className={styles.input}>
                <Input
                  addonBefore="邮&nbsp;&nbsp;&nbsp;&nbsp;箱"
                  defaultValue={this.state.userEmail}
                  value={this.state.userEmail}
                  onChange={e => this.setState({ userEmail: e.target.value })}
                ></Input>
              </div>
            </div>
            <div className={styles.upInfoButton}>
              <Button onClick={this.upInfo} type="primary">
                更新用户信息
              </Button>
            </div>
          </div>
          <div
            className={styles.updatePassword}
            onClick={e => {
              e.stopPropagation();
            }}
          >
            {!this.state.display ? (
              <span>设置密码</span>
            ) : (
              <Input.Password
                addonBefore="密 码"
                placeholder="请输入密码"
                onChange={e => this.setState({ password: e.target.value })}
              />
            )}

            <div className={styles.upInfoButton}>
              <Button onClick={this.upPassword} type="primary">
                {!this.state.display ? '设置' : '更新密码'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
