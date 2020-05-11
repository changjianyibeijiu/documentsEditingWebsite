import { Radio, List, message, Avatar, Spin, Modal, Input } from 'antd';
// import reqwest from 'reqwest';

import InfiniteScroll from 'react-infinite-scroller';

import request from '@/utils/request';

import styles from './index.less';

import { history, Link } from 'umi';

export default class InfiniteListExample extends React.Component {
  state = {
    visible: false,
    data: [],
    loading: false,
    hasMore: true,
    time: 1,
    folderId: this.props.match.params.folderId
      ? this.props.match.params.folderId
      : false,
    type: 'word',
    name: '新建文件',
  };

  share(id, folderId) {
    request
      .post(`/share`, { data: { id: id, folderId: folderId } })
      .then(response => {
        if (response.data.status == 'ok') {
          message.success('已分享文档');
        }
      });
  }
  edit(foldrId, id, type) {
    if (type == 'word') {
      history.push(`/edit/word/${foldrId}/${id}`);
    } else if (type == 'mind') {
      history.push(`/edit/mind/${foldrId}/${id}`);
    } else if (type == 'md') {
      history.push(`/edit/md/${foldrId}/${id}`);
    }
  }
  delete(id, folderId) {
    request
      .post('/delete', { data: { id: id, folderId: folderId } })
      .then(response => {
        if (response.data.status == 'ok') {
          message.success('已删除文档');
        }
      });
  }

  componentDidMount() {
    this.fetchData(
      res => {
        this.setState({
          data: res.data.data ? res.data.data : [],
        });
      },
      this.state.time,
      this.state.folderId,
    );
  }

  fetchData = (callback, time, folderId) => {
    request
      .get('/folder?folderId=' + folderId + '&results=20&time=' + time)
      .then(callback);
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
    this.fetchData(
      res => {
        data = data.concat(res.data.data);
        this.setState({
          data,
          loading: false,
        });
      },
      this.state.time,
      this.state.folderId,
    );
  };

  createFile = () => {
    this.setState({ visible: true });
  };

  handleOk = e => {
    // console.log(e);
    this.setState({
      visible: false,
    });
    console.log('关闭');

    let data = {
      content: '',
      name: this.state.name,
      createTime: new Date(),
      id: '',
      editTime: Date.now(),
    };

    request
      .post(`/file`, {
        type: this.state.type,
        data: data,
        folderId: this.props.match.params.folderId,
        id: '',
      })
      .then(response => {
        let result = response.data.data;
        console.log(result);
        // console.log(this.state.data);
        // let arr = this.state.data.unshift({...result});
        // console.log(arr);
        // this.setState({data:[...arr]});
        this.fetchData(
          res => {
            this.setState({
              data: res.data.data,
            });
          },
          1,
          this.state.folderId,
        );
      });
  };



  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  inputChange = e => {
    console.log('input change');
    console.log(e.target.value);
    this.setState({ name: e.target.value });
    // console.log(this.state.folderName);
  };

  type = e => {
    this.setState({ type: e.target.value });
  };

  render() {
    return (
      <div className={styles.demoInfiniteContainer}>
        <Modal
          title="新建文件"
          visible={this.state.visible}
          // visible={true}

          onOk={this.handleOk}
          onCancel={this.handleCancel}
          cancelText="取消"
          okText="确认"
        >
          <p>文件夹名</p>
          <Input placeholder="请输入文件名" onChange={this.inputChange} />
          <p style={{ marginTop: '1rem' }}>类型</p>
          <div>
            <Radio.Group
              defaultValue="word"
              buttonStyle="solid"
              onChange={this.type}
            >
              <Radio.Button value="word">Word</Radio.Button>
              <Radio.Button value="md">Markdown</Radio.Button>
              <Radio.Button value="excel">表格</Radio.Button>
              <Radio.Button value="flowSheet">流程图</Radio.Button>
              <Radio.Button value="mind">思维导图</Radio.Button>
            </Radio.Group>
          </div>
        </Modal>
        {this.props.match.params.folder?<div></div>:<div className={styles.createFile} onClick={this.createFile}>
          添加文件
        </div>}
        

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

                    this.props.match.params.folder?<span
                    className={styles.option}
                    key="option"
                    onClick={() => {
                      // this.preview(this.state.folderId, item.id, item.type);
                      history.push('/preview/'+this.state.folderId+'/'+item.id);
                    }}
                  >
                    {item.name}
                  </span>:
                    item.type ? (
                      <span
                        className={styles.option}
                        key="option"
                        onClick={() => {
                          this.edit(this.state.folderId, item.id, item.type);
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
                
                {this.props.match.params.folder?<span></span>:item.type ? (
                  <div className={styles.optionBox}>
                    <span
                      className={styles.option}
                      key="option2"
                      onClick={() => {
                        this.delete(item.id, this.state.folderId);
                      }}
                    >
                      删除
                    </span>{' '}
                    <span
                      key="option3"
                      onClick={() => {
                        this.edit(this.state.folderId, item.id, item.type);
                      }}
                    >
                      编辑
                    </span>
                  </div>
                ) : (
                  <div className={styles.optionBox}>
                    <span
                      className={styles.option}
                      key="option1"
                      onClick={() => {
                        this.share(item.id, this.state.folderId);
                      }}
                    >
                      分享
                    </span>
                    <span
                      key="option2"
                      onClick={() => {
                        this.delete(item.id, this.state.folderId);
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
