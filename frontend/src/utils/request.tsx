import axios from 'axios'; //http://www.axios-js.com/zh-cn/docs/#axios-create-config

import { Button, notification, Space, Modal } from 'antd';

import { history } from 'umi';
import { reMoveToken, readToken, saveToken } from './auth';

import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

//创建请求实例
const service = axios.create({
  baseURL: 'http://127.0.0.1:7001/api/',
  timeout: 25000,
});

const openNotificationWithIcon = (type, message) => {
  notification[type]({
    message: message,
  });
};

function showConfirm() {
  confirm({
    title: '用户身份以过期，请重新登陆！',
    icon: <ExclamationCircleOutlined />,
    onOk() {
      reMoveToken();
      history.push('/account/login');
    },
    onCancel() {
      return false;
    },
  });
}

//实例方法，拦截请求
service.interceptors.request.use(
  config => {
    config.headers['authorization'] = readToken(); //将口令加入请求头中

    return config;
  },
  error => {
    //console.log(error);
    return Promise.reject(error);
  },
);
service.interceptors.response.use(
  response => {
    const data = response.data;
    //console.log(data);
    if (data.code == '200') {
      //服务器返回200表示正确，否则出错
      switch (data.data.status) {
        case '7004':
          openNotificationWithIcon('error', '请登陆账号！');
          reMoveToken();
          history.push('/account/login');
          break;
        case '7000':
          showConfirm();
          break;
        case '7001':
          showConfirm();
          break;
        case '7002':
          showConfirm();
          break;
        case '7003':
          showConfirm();
          break;
      }
      return response;
    } else {
      openNotificationWithIcon('error', '服务器端错误');

      return Promise.reject(new Error(data.meesage || 'Error')); //抛出错误
    }
  },
  error => {
    //console.log(error);
    openNotificationWithIcon('error', '无网络');

    return Promise.reject(error);
  },
);

export default service;
