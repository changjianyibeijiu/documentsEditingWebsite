

import React from 'react'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import styles from './index.less'
import { Button, Card, List, Typography, Modal, Form, Input, Layout } from 'antd';

import request from '@/utils/request';

const { TextArea } = Input;



async function fetchEditorContent(id,folderId) {
  let data = {};
  await request.get(`/file?id=${id}&folderId=${folderId}`).then((response) => {
    data = response.data.data;
  });
  // console.log(`find file ${data}`);
  return data;
}

async function saveEditorContent(data,type,folderId,id) {
  let result = {};
  await request.post(`/file`, {type:type, data: data,folderId:folderId,id:id}).then((response) => {
    result = response.data.data;
  });
  return result;
}



export default class EditorPage extends React.Component {

  state = {
    id:'',

    folderId:'',

    name:'',

    type:'word',

    editorState: BraftEditor.createEditorState(null),

    saved: false,

    createTime: '',

    editTime:'',

    savebutton:'',
  }
  
  // fetchEditorContent = this.props.getdata;
  // saveEditorContent = this.props.savedata;
  async componentDidMount() {
    // console.log(this.props.match);
    // 假设此处从服务端获取html格式的编辑器内容
    // console.log("docid");
    console.log(this.props.match.params.id);
    console.log(this.props.match.params.folderId);

    const id = this.props.match.params.id?this.props.match.params.id:false;
    const folderId = this.props.match.params.folderId?this.props.match.params.folderId:false;
    if (id) {

      let data = await fetchEditorContent(id,folderId);

      console.log(data);

      let rawContent = data.content;

      console.log(rawContent)

      this.setState({

        editorState: BraftEditor.createEditorState(rawContent),
        name: data.name,
        id: data.id,
        createTime:data.createTime,
        folderId: data.folderId?data.folderId:false,
      })
    }

    else if(!id){
      this.setState({
        editorState: BraftEditor.createEditorState(null),
        // saved: false,
        name: "新建文件",
        share: false,
        createTime: new Date(),
        editTime: Date.now(),
      })

    }
    else{
      this.setState({
        editorState: BraftEditor.createEditorState(null),
        // saved: false,
        name: "新建文件",
        share: false,
        discription: '文件描述',
        createTime: new Date(),
        editTime: Date.now(),

      })
    }
    // 使用BraftEditor.createEditorState将html字符串转换为编辑器需要的editorState数据

  }

  submitContent = async () => {
    // 在编辑器获得焦点时按下ctrl+s会执行此方法
    // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容

    // const htmlContent = this.state.editorState.toHTML()
    // if(this.state.saved==false){
    //   Modal.info();
    // }
    const rawString = this.state.editorState.toRAW();
    let data = {
      content: rawString,
      name: this.state.name,
      createTime: this.state.createTime,
      id: this.state.id,
      editTime: Date.now(),
    }

    const result = await saveEditorContent(data,'word',this.state.folderId,this.state.id);
      this.setState({
        id:result.id,
        folderId: result.folderId?result.folderId:'',
        savebutton:"disabled"
      });
    
  
 
  }

  handleEditorChange = (editorState) => {
    console.log(this)
    this.setState({ editorState,savebutton:'' })
  }

 


  render() {
    const extendControls = [
      {
        key: 'save-button',
        type: 'button',
        text: '保存',
        onClick: this.submitContent,
        disabled:this.state.savebutton
      }, 
    ]
    const { editorState } = this.state
    // console.log(editorState);
    return (
      <div className={styles.box}>

        <BraftEditor
          value={editorState}
          onChange={this.handleEditorChange}
          onSave={this.submitContent}
          extendControls = {extendControls}

          className = {styles.editorBox}
       
          controlBarClassName={styles.controlBar}
          contentClassName={styles.content}
        />
      </div>
    )

  }

}