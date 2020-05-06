import { Layout, Avatar, Input, Menu, Button } from 'antd';
import React, { Component } from 'react';
const { Header, Footer, Sider, Content } = Layout;
import styles from './index.less';
import { history } from 'umi';
const { Search } = Input;

import NewCreate from '@/components/newCreate/index';
import UserCard from '@/components/userCard/index';

import {
  ClockCircleOutlined,
  FolderOutlined,
  ForkOutlined,
  SearchOutlined,
  DeleteOutlined,
  PlusOutlined,
} from '@ant-design/icons';

function NewCard(props) {
  if (props.display) {
    return <NewCreate></NewCreate>;
  } else {
    return <div />;
  }
}
function User(props) {
  if (props.display) {
    return <UserCard></UserCard>;
  } else {
    return <div />;
  }
}

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: '1', //当前选择菜单项
      newCreate: false, //显示新建选项卡
      userCard:false, //用户选项卡
      data: {
        userName: '',
        userEmail: '',
        avatar: '',
      },
    };
  }
  newCreate(e) {
    this.setState({ newCreate: true });
    e.stopPropagation();
  }
  user(e) {
    this.setState({ userCard: true });
    e.stopPropagation();
  }

  menuHandleChange({ item, key, keyPath, domEvent }) {
    console.log(item);
    console.log(key);
    console.log(keyPath);
  }

  render() {
    return (
      <div onClick={() => this.setState({ newCreate: false,userCard:false })}>
        <Layout>
          <div className={styles.headerBox}>
            <header className={styles.header}>
              <div className={styles.yunLogo}>
                <img src="/img/logo.png"></img>
              </div>
              <div className={styles.yunName}>米粒文档</div>

              <Search
                className={styles.search}
                placeholder="请输入搜索内容"
                onSearch={value => console.log(value)}
              />
              <div className={styles.user}>
                <Avatar className={styles.avatar} onClick ={(e)=>this.user(e)}></Avatar>

                <div className={styles.userCard}>
                  <User display={this.state.userCard}></User>
                </div>
              </div>
            </header>
          </div>
          <Layout className={styles.main}>
            <Sider theme="light" className={styles.sider}>
              <div className={styles.newDoc}>
                <Button onClick={e => this.newCreate(e)} type="primary" block>
                  <PlusOutlined />
                  新建
                </Button>
                <div className={styles.newCreate}>
                  <NewCard display={this.state.newCreate}></NewCard>
                </div>
              </div>
              <Menu
                defaultSelectedKeys={this.state.current}
                onClick={({ item, key, keyPath, domEvent }) =>
                  this.menuHandleChange({ item, key, keyPath, domEvent })
                }
              >
                {/* <Link to = "recently"> */}
                <Menu.Item
                  key="1"
                  onClick={() => history.push('/recently')}
                  icon={<ClockCircleOutlined></ClockCircleOutlined>}
                >
                  最近
                </Menu.Item>
                {/* </Link> */}
                {/* <Link to = "myDoc"> */}
                <Menu.Item
                  key="2"
                  onClick={() => history.push('/myDoc')}
                  icon={<FolderOutlined />}
                >
                  我的文档
                </Menu.Item>
                {/* </Link> */}
                {/* <Link to="share"> */}
                <Menu.Item
                  key="3"
                  onClick={() => history.push('/share')}
                  icon={<ForkOutlined />}
                >
                  共享
                </Menu.Item>
                {/* </Link> */}
                {/* <Link to="find"> */}
                <Menu.Item
                  key="4"
                  onClick={() => history.push('/find')}
                  icon={<SearchOutlined />}
                >
                  发现
                </Menu.Item>
                {/* </Link> */}
                {/* <Link to="recycleBin"> */}
                <Menu.Item
                  key="5"
                  onClick={() => history.push('/recycleBin')}
                  icon={<DeleteOutlined />}
                >
                  回收站
                </Menu.Item>
                {/* </Link> */}
              </Menu>
            </Sider>
            <Content className={styles.content}>{this.props.children}</Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}
