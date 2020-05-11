import { List, message, Avatar, Spin } from 'antd';
// import reqwest from 'reqwest';

import InfiniteScroll from 'react-infinite-scroller';

import request from '@/utils/request';

import styles from './index.less';

import { history, Link } from 'umi';

export default class InfiniteListExample extends React.Component {
  state = {
    data: [],
    loading: false,
    hasMore: true,
    time: 1,
  };

  unshare(id, folderId) {
    request
      .post(`/unshare`, { data: { id: id, folderId: folderId } })
      .then(response => {
        if (response.data.status == 'ok') {
          message.success('已取消分享');
        }
        this.fetchData(res => {
          this.setState({
            data: res.data.data,
          });
        }, 1);
      });
  }
  share(id, folderId) {
    request
      .post(`/share`, { data: { id: id, folderId: folderId } })
      .then(response => {
        if (response.data.status == 'ok') {
          message.success('已分享文档');
        }
      });
  }
  edit(id, type) {
    if (type == 'word') {
      history.push(`/edit/word/${id}`);
    } else if (type == 'mind') {
      history.push(`/edit/mind/${id}`);
    } else if (type == 'md') {
      history.push(`/edit/md/${id}`);
    }
  }
  delete(id, folderId) {
    request
      .post('/delete', { data: { id: id, folderId: folderId } })
      .then(response => {
        console.log(response.data);
        this.fetchData(res => {
          this.setState({
            data: res.data.data,
          });
        }, 1);
      });
  }

  componentDidMount() {
    this.fetchData(res => {
      this.setState({
        data: res.data.data,
      });
    }, this.state.time);
  }

  fetchData = (callback, time) => {
    request.get('/myDoc?results=20&time=' + time).then(callback);
    this.setState({ time: ++this.state.time });
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
    }, this.state.time);
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
                  avatar={<Avatar src={item.icon} />}
                  // title={<a href={}>{item.name}</a>}
                  title={
                    item.type ? (
                      <span
                        className={styles.option}
                        key="option"
                        onClick={() => {
                          this.edit(item.id, item.type);
                        }}
                      >
                        {item.name}
                      </span>
                    ) : (
                      <Link to={'/folder/' + item.folderId}>{item.name}</Link>
                    )
                  }
                  description={'创建时间：' + item.createTime}
                />
                {item.type ? (
                  <div className={styles.optionBox}>
                    {item.share ? (
                      <span
                        className={styles.option}
                        key="option1"
                        onClick={() => {
                          this.unshare(item.id, item.folderId);
                        }}
                      >
                        已分享
                      </span>
                    ) : (
                      <span
                        className={styles.option}
                        key="option1"
                        onClick={() => {
                          this.share(item.id, item.folderId);
                        }}
                      >
                        分享
                      </span>
                    )}
                    <span
                      className={styles.option}
                      key="option2"
                      onClick={() => {
                        this.delete(item.id, false);
                      }}
                    >
                      删除
                    </span>{' '}
                    <span
                      key="option3"
                      onClick={() => {
                        this.edit(item.id, item.type);
                      }}
                    >
                      编辑
                    </span>
                  </div>
                ) : (
                  <div className={styles.optionBox}>
                    {item.share ? (
                      <span
                        className={styles.option}
                        key="option1"
                        onClick={() => {
                          this.unshare(item.id, item.folderId);
                        }}
                      >
                        已分享
                      </span>
                    ) : (
                      <span
                        className={styles.option}
                        key="option1"
                        onClick={() => {
                          this.share(item.id, item.folderId);
                        }}
                      >
                        分享
                      </span>
                    )}
                    <span
                      key="option2"
                      onClick={() => {
                        this.delete(false, item.folderId);
                      }}
                    >
                      删除
                    </span>
                  </div>
                )}
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
