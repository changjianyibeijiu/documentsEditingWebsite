import { Col, Row } from 'antd';
import GGEditor, { Mind } from 'gg-editor';

import EditorMinimap from './components/EditorMinimap';
import { MindContextMenu } from './components/EditorContextMenu';
import { MindDetailPanel } from './components/EditorDetailPanel';
import { MindToolbar } from './components/EditorToolbar';
import styles from './index.less';
import React, { Component } from 'react';

import request from '@/utils/request';




GGEditor.setTrackable(false);



async function fetchEditorContent(id, folderId) {
  let data = {};
  await request.get(`/file?id=${id}&folderId=${folderId}`).then(response => {
    data = response.data.data;
  });
  // //console.log(`find file ${data}`);
  return data;
}



export default class index extends Component {

  state = {
    id: '',

    folderId: '',

    name: '',

    type: 'mind',

    saved: false,

    createTime: '',

    editTime: '',


    content: {
      "roots": [
        {
          "label": "主题",
          "children": []
        }
      ]
    },
    


  };


  async componentDidMount() {
    document.title = '思维导图-'+this.state.name;

    // //console.log(this.props.match);
    // 假设此处从服务端获取html格式的编辑器内容
    // //console.log("docid");
    //console.log(this.props.match.params.id);
    //console.log(this.props.match.params.folderId);

    const id = this.props.match.params.id ? this.props.match.params.id : false;
    const folderId = this.props.match.params.folderId
      ? this.props.match.params.folderId
      : false;
    if (id) {
      let data = await fetchEditorContent(id, folderId);

      //console.log(data);

      let Content = data.content;

      //console.log(Content);

      this.setState({
        content: Content?JSON.parse(Content):this.state.content,
        name: data.name,
        id: data.id,
        createTime: data.createTime,
        folderId: data.folderId ? data.folderId : false,
      });
    } else if (!id) {
      this.setState({
        
        name: '',
        share: false,
        createTime: new Date(),
        editTime: Date.now(),
      });
    } else {
      this.setState({

        name: '',
        share: false,
        createTime: new Date(),
        editTime: Date.now(),
      });
    }
  }

updata(result){
  //console.log(result);

}



  render() {
    return (
      <div>
         <GGEditor className={styles.editor}>
      <Row className={styles.editorHd}>
        <Col span={24}>
          <MindToolbar data = {{name: this.state.name, 
            createTime: this.state.createTime,
            id: this.state.id,
            folderId: this.state.folderId,
            updata: this.updata
            }}/>
        </Col>
      </Row>
      <Row className={styles.editorBd}>
        <Col span={20} className={styles.editorContent}>
          <Mind data={this.state.content} className={styles.mind} />
        </Col>
        <Col span={4} className={styles.editorSidebar}>
          <MindDetailPanel />
          <EditorMinimap />
        </Col>
      </Row>
      <MindContextMenu />
    </GGEditor>
      </div>
    )
  }
}

