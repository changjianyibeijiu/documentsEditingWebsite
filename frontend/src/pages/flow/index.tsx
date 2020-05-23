import { Col, Row } from 'antd';
import GGEditor, { Flow } from 'gg-editor';

import EditorMinimap from './components/EditorMinimap';
import { FlowContextMenu } from './components/EditorContextMenu';
import { FlowDetailPanel } from './components/EditorDetailPanel';
import { FlowItemPanel } from './components/EditorItemPanel';
import { FlowToolbar } from './components/EditorToolbar';
import styles from './index.less';
import React, { Component } from 'react'
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


export default class  extends Component {



  state = {
    id: '',

    folderId: '',

    name: '',

    type: 'flow',

    saved: false,

    createTime: '',

    editTime: '',


    content: {

    },
    


  };


  async componentDidMount() {
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
        content: Content?JSON.parse(Content):{},
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
          <FlowToolbar data = {{name: this.state.name, 
            createTime: this.state.createTime,
            id: this.state.id,
            folderId: this.state.folderId,
            updata: this.updata
            }}/>
        </Col>
      </Row>
      <Row className={styles.editorBd}>
        <Col span={4} className={styles.editorSidebar}>
          <FlowItemPanel />
        </Col>
        <Col span={16} className={styles.editorContent}>
          <Flow className={styles.flow} data={this.state.content}/>
        </Col>
        <Col span={4} className={styles.editorSidebar}>
          <FlowDetailPanel />
          <EditorMinimap />
        </Col>
      </Row>
      <FlowContextMenu />
    </GGEditor>
      </div>
    )
  }
}
