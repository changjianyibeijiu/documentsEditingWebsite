import React, { Component } from 'react';

import styles from './account.less';
import { Link, history } from 'umi';

export default class account extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   current: history.location.pathname,
    // };
  }

  render() {
    return (
      <div className={styles.accountBox}>
        <div className={styles.account}>
          <div className={styles.options}>
            <Link
              to="/account/login"
              onClick={e => this.setState({ current: 'login' })}
            >
              <div
                style={{
                  borderBottom:
                    history.location.pathname == '/account/login'
                      ? '3px solid #5890ff'
                      : 'none',
                }}
              >
                登 陆
              </div>
            </Link>
            <Link
              to="/account/register"
              onClick={e => this.setState({ current: 'register' })}
            >
              <div
                style={{
                  borderBottom:
                    history.location.pathname == '/account/register'
                      ? '3px solid #5890ff'
                      : 'none',
                }}
              >
                注 册
              </div>
            </Link>
          </div>
          <div className={styles.formMain}>{this.props.children}</div>
        </div>
      </div>
    );
  }
}
