

import React, { Component } from 'react';
import { List, Card, Avatar } from 'antd';
import styles from './index.less';
import { Link } from 'umi';



export default class index extends Component {
  render() {

    return (
      <div className={styles.list}>
        <div className={styles.name}>{this.props.name}</div>
        <div className={styles.option}>
            <Link to='/userCenter'><div>个人中心</div></Link>
            <Link to='/help'><div>帮助与反馈</div></Link>
            <Link to='/account/login'><div>退出账号</div></Link>
        </div>
        
      </div>
    );
  }
}
