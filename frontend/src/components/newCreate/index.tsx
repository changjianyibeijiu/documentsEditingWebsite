import React, { Component } from 'react';
import { List, Card, Avatar } from 'antd';
import styles from './index.less';

import { FileWordFilled,FileExcelFilled,FormatPainterFilled,FileMarkdownFilled,FileTextFilled,FolderFilled,FolderOpenFilled} from '@ant-design/icons';

export default class index extends Component {
  render() {
    const data1 = [
      {
        img: <FileWordFilled />,
        title: '文字',
        color:'#4991f2'
      },
      {
        img: <FileExcelFilled />,
        title: '表格',
        color:'#26BD85'
      },
      {
        img: <FormatPainterFilled />,
        title: '流程图',
        color:'#687bf7'
      },
      {
        img: <FileTextFilled />,
        title: '思维导图',
        color:'#16bcac'
      },
      {
        img: <FileMarkdownFilled />,
        title: 'MarkDown',
        color:'#4991f2'
      },
    ];
    const data2 = [
      {
        img: <FolderFilled />,
        title: '文件夹',
        color:'#91abec'
      },
      {
        img: <FolderOpenFilled />,
        title: '共享文件夹',
        color:'#91abec'
      },
    ];
    return (
      <div className={styles.list}>
        <List
          grid={{
            gutter: 16,
            column: 4,
          }}
          // split={true}
          dataSource={data1}
          renderItem={item => (
            <List.Item>
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
            </List.Item>
          )}
        />
      </div>
    );
  }
}
