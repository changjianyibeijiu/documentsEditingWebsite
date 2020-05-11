

import { List, message, Avatar, Spin } from 'antd';
// import reqwest from 'reqwest';

import InfiniteScroll from 'react-infinite-scroller';


import request from '@/utils/request';

import styles from './index.less';

import {history} from 'umi';

export default class InfiniteListExample extends React.Component {
  state = {
    data: [],
    loading: false,
    hasMore: true,
    time:1,
  };

  restore(id,folderId) {
    request.post(`/restore`, { data: { id: id,folderId: folderId } }).then(
      (response)=>{
        if(response.data.status=='ok'){
          message.success('已还原');

        }
        this.fetchData(res => {
          this.setState({
            data: res.data.data,
          });
        },1);
      }
    );
  }

  rm(id,folderId) {
    request.post('/rm', { data: {id: id,folderId:folderId } }).then(
      (response)=>{
        if(response.data.status=='ok'){
          message.success('已删除');
        }
        this.fetchData(res => {
          this.setState({
            data: res.data.data,
          });
        },1);
      }
    );
  }

  componentDidMount() {
    this.fetchData(res => {
      this.setState({
        data: res.data.data,
      });
    },this.state.time);
  }

  fetchData = (callback,time) => {
   
    request.get("/recycleBinList?results=20&time="+time).then(callback);
    this.setState({time:++this.state.time});
  };

  handleInfiniteOnLoad = () => {
    let { data } = this.state;
    this.setState({
      loading: true,
    });
    if (data.length > 100) {
      message.warning('已加载全部数据');
      this.setState({
        hasMore: false,
        loading: false,
      });
      return;
    }
    this.fetchData(res => {
      data = data.concat(res.data.data);
      this.setState({
        data,
        loading: false,
      });
    },this.state.time);
  };

  render() {
    return (
      <div className={styles.demoInfiniteContainer}>
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={this.handleInfiniteOnLoad}
          hasMore={!this.state.loading && this.state.hasMore}
          useWindow={false}
        >
          <List
            dataSource={this.state.data}
            renderItem={item => (
              <List.Item key={item.id} className={styles.list}>
                <List.Item.Meta
                  avatar={
                    <Avatar src={item.icon} />
                  }
                  title={<div>{item.name}</div>}
                  description={'创建时间：'+item.createTime}
                />
                <div className={styles.optionBox}><span className={styles.option} key="option1" onClick={() => { this.restore(item.id,item.folderId) }}>还原</span><span key="option2" onClick={() => { this.rm(item.id,item.folderId) }}>删除</span></div>
                
              </List.Item>
            )}
          >
            {this.state.loading && this.state.hasMore && (
              <div className={styles.demoLoadingContainer}>
                <Spin />
              </div>
            )}
          </List>
        </InfiniteScroll>
      </div>
    );
  }
}
