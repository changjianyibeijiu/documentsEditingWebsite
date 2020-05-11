import React, { Component } from 'react';
import { List, Card, Avatar, Modal, Button, Input } from 'antd';
import styles from './index.less';

import request from '@/utils/request';
import {history} from 'umi';

import {
  FileWordFilled,
  FileExcelFilled,
  FormatPainterFilled,
  FileMarkdownFilled,
  FileTextFilled,
  FolderFilled,
  FolderOpenFilled,
} from '@ant-design/icons';

import { Link } from 'umi';



export default class index extends Component {

  constructor(props) {
    super(props);
    this.state = { visible: false,
      folderName:'',
      share:false
    };

  
  }


  createFolder=(share)=> {

    
    this.setState({visible: true});

    this.setState({share:share})

  }

  handleOk = e => {
    // console.log(e);
    this.setState({
      visible: false,
    });
    this.props.closeNewCreate();
    console.log("关闭")
    request.post('/folder',{share:this.state.share,folder:this.state.folderName,createTime:new Date(),editTime: Date.now()});
    setTimeout(()=>{
      if(this.state.share){
        history.push('/share');
      }
      else{
        history.push('/myDoc');
  
      }
    },1100);
    
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
    this.props.closeNewCreate();

  };

  inputChange=(e)=>{
    console.log("input change");
    console.log(e.target.value);
    this.setState({folderName:e.target.value});
    // console.log(this.state.folderName);
  }

  render() {
    const data1 = [
      {
        img: <FileWordFilled />,
        title: '文字',
        color: '#4991f2',
        path: '/edit/word',
      },
      {
        img: <FileExcelFilled />,
        title: '表格',
        color: '#26BD85',
        path: '/edit/excel',
      },
      {
        img: <FormatPainterFilled />,
        title: '流程图',
        color: '#687bf7',
        path: '/edit/flowSheet',
      },
      {
        img: <FileTextFilled />,
        title: '思维导图',
        color: '#16bcac',
        path: '/edit/mind',
      },
      {
        img: <FileMarkdownFilled />,
        title: 'MarkDown',
        color: '#4991f2',
        path: '/edit/md',
      },
    ];
    const data2 = [
      {
        img: <FolderFilled />,
        title: '文件夹',
        color: '#91abec',
        path: '/edit/folder',
        share: false,
      },
      {
        img: <FolderOpenFilled />,
        title: '共享文件夹',
        color: '#91abec',
        path: '/edit/shareFolder',
        share: true,
      },
    ];
    return (
      <div className={styles.list} onClick={(e)=>{e.stopPropagation();}}>
          <Modal
          title="新建文件夹"
          visible={this.state.visible}
          // visible={true}

          onOk={this.handleOk}
          onCancel={this.handleCancel}
          cancelText="取消"
          okText="确认"
        >
          <p>文件夹名</p>
          <Input placeholder="请输入文件夹名" onChange={this.inputChange}/>
        </Modal>
        <List
          grid={{
            gutter: 16,
            column: 4,
          }}
          // split={true}
          dataSource={data1}
          renderItem={item => (
            <List.Item>
              <Link to={item.path} className={styles.link}>
                <Card
                  bodyStyle={{
                    padding: '5px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                  }}
                  style={{ fontSize: '0.8rem' }}
                  bordered={false}
                >
                  <Avatar
                    style={{
                      color: item.color,
                      backgroundColor: '#fff',
                      fontSize: '2rem',
                    }}
                    icon={item.img}
                    shape="square"
                    size="large"
                  ></Avatar>
                  <div>{item.title}</div>
                </Card>
              </Link>
            </List.Item>
          )}
        />
        <List
          grid={{
            gutter: 10,
            column: 4,
          }}
          // split={true}
          dataSource={data2}
          renderItem={item => (
            <List.Item>
              <div
                className={styles.link}
                onClick={() => this.createFolder(item.share)}
              >
                <Card
                  bodyStyle={{
                    padding: '5px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                  }}
                  style={{ fontSize: '0.8rem' }}
                  bordered={false}
                >
                  <Avatar
                    style={{
                      color: item.color,
                      backgroundColor: '#fff',
                      fontSize: '2rem',
                    }}
                    icon={item.img}
                    shape="square"
                    size="large"
                  ></Avatar>
                  <div>{item.title}</div>
                </Card>
              </div>
            </List.Item>
          )}
        />
      
      </div>
    );
  }
}
