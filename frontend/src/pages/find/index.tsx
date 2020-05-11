import { List, message, Avatar, Spin,Input} from 'antd';
// import reqwest from 'reqwest';

import InfiniteScroll from 'react-infinite-scroller';

import request from '@/utils/request';

import styles from './index.less';

import { history, Link } from 'umi';

const { Search } = Input;

export default class InfiniteListExample extends React.Component {
  state = {
    data: [],
    loading: false,
    hasMore: true,
    time: 1,
    searchTime:1,
  };

  componentDidMount() {
    console.log(this.props.location.query)
    if(this.props.location.query.search){
      this.searchData(res=>{
        this.setState({data:res.data.data});
      },this.props.location.query,this.state.searchTime);
    }
    else{
      this.fetchData(res => {
        this.setState({
          data: res.data.data,
        });
      }, this.state.time);
    }
   
  }

  searchData = (callback,searchData,time) => {
    request.post('/search',{searchData: searchData,time:time,results:20}).then(callback);
    this.setState({ searchTime: ++this.state.searchTime });
  };

  fetchData = (callback, time) => {
    request.get('/findList?results=20&time=' + time).then(callback);
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
    if(true==this.props.location.query){
      this.searchData(res=>{
        data = data.concat(res.data.data);

        this.setState({data,loading:false});
      },this.props.location.query,this.state.searchTime);
    }
    else{
     
      this.fetchData(res => {
        data = data.concat(res.data.data);
        this.setState({
          data,
          loading: false,
        });
      }, this.state.time);
    }

   
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
           <Search
                className={styles.search}
                placeholder="请输入搜索内容"
                onSearch={value => {if(value){history.push('/find?search='+value);
                this.searchData(res=>{          
                  this.setState({data:res.data.data,loading:false,searchTime:1});
                },value,1);
              }}}
              />


          <List
            dataSource={this.state.data}
            renderItem={item => (
              <List.Item key={item.id} className={styles.list}>
                <List.Item.Meta
                  avatar={<Avatar src={item.icon} />}
                  title={
                    item.type ? (
                      <span
                        className={styles.option}
                        key="option"
                        onClick={() => {
                          // this.preview(item.id, item.type);
                          history.push('/preview/' + item.id);
                        }}
                      >
                        {item.name}
                      </span>
                    ) : (
                      <Link to={'/share/folder/' + item.folderId}>
                        {item.name}
                      </Link>
                    )
                  }
                  description={
                    '最近修改时间：' +
                    new Date(Number(item.editTime)).toLocaleString()
                  }
                />
                <div>
                  <span className={styles.userName}>{item.userName}</span>
                  <Avatar src={item.avatar} />
                </div>
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
