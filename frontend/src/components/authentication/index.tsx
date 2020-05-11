import React, { Component } from 'react';
import { readToken, reMoveToken } from '@/utils/auth';

import { history } from 'umi';

export default class index extends Component {
  componentDidMount() {
    if (!readToken()) {
      history.push('/account/login');
    }
  }
  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>{this.props.children}</div>
    );
  }
}
