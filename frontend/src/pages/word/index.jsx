import React from 'react';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import styles from './index.less';
import {
  Button,
  Card,
  List,
  Typography,
  Modal,
  Form,
  Input,
  Layout,
  Radio
} from 'antd';

import request from '@/utils/request';

const { TextArea } = Input;

async function fetchEditorContent(id, folderId) {
  let data = {};
  await request.get(`/file?id=${id}&folderId=${folderId}`).then(response => {
    data = response.data.data;
  });
  // //console.log(`find file ${data}`);
  return data;
}

async function saveEditorContent(data, type, folderId, id) {
  let result = {};
  await request
    .post(`/file`, { type: type, data: data, folderId: folderId, id: id })
    .then(response => {
      result = response.data.data;
    });
  return result;
}

export default class EditorPage extends React.Component {
  state = {
    id: '',

    folderId: '',

    name: '',

    type: 'word',

    editorState: BraftEditor.createEditorState(null),

    saved: false,

    createTime: '',

    editTime: '',

    savebutton: '',

    visible: false,


  };

  // fetchEditorContent = this.props.getdata;
  // saveEditorContent = this.props.savedata;
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

      let rawContent = data.content;

      //console.log(rawContent);

      this.setState({
        editorState: BraftEditor.createEditorState(rawContent),
        name: data.name,
        id: data.id,
        createTime: data.createTime,
        folderId: data.folderId ? data.folderId : false,
      });
    } else if (!id) {
      this.setState({
        editorState: BraftEditor.createEditorState(null),
        // saved: false,
        name: '',
        share: false,
        createTime: new Date(),
        editTime: Date.now(),
      });
    } else {
      this.setState({
        editorState: BraftEditor.createEditorState(null),
        // saved: false,
        name: '',
        share: false,
        createTime: new Date(),
        editTime: Date.now(),
      });
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
    if(this.state.name==''){
      this.setState({ visible: true });
    }else{

    const rawString = this.state.editorState.toRAW();
    let data = {
      content: rawString,
      name: this.state.name,
      createTime: this.state.createTime,
      id: this.state.id,
      editTime: Date.now(),
    };
    //console.log(data)
    const result = await saveEditorContent(
      data,
      'word',
      this.state.folderId,
      this.state.id,
    );
    //console.log(result);

    if(result){
      message.success(result.message);
    }

    this.setState({
      id: this.state.id?this.state.id:result.id,
      folderId: this.state.folderId?this.state.folderId:result.folderId ? result.folderId : '',
      savebutton: 'disabled',
    });
    }
  };

  inputChange = e => {
    //console.log('input change');
    //console.log(e.target.value);
    this.setState({ name: e.target.value });
    // //console.log(this.state.folderName);
  };

  type = e => {
    // this.setState({ type: e.target.value });
  };

  handleOk = e => {
    // //console.log(e);
    this.setState({
      visible: false,
    });
    this.submitContent();

  };

  handleCancel = e => {
    //console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleEditorChange = editorState => {
    //console.log(this);
    this.setState({ editorState, savebutton: '' });
  };

  render() {
    const extendControls = [
      {
        key: 'save-button',
        type: 'button',
        text: '保存',
        onClick: this.submitContent,
        disabled: this.state.savebutton,
      },
      {
        key: 'print-button',
        type :'button',
        title: '打印文档内容',
        text: '打印',
        onClick:()=>{
          this.submitContent();
          window.document.body.innerHTML = this.state.editorState.toHTML();
          window.print();
          window.location.reload();
        }
      }
    ];
    const { editorState } = this.state;
    // //console.log(editorState);
    return (
      <div className={styles.box}>
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
              {/* <Radio.Button value="md">Markdown</Radio.Button>
              <Radio.Button value="excel">表格</Radio.Button>
              <Radio.Button value="flowSheet">流程图</Radio.Button>
              <Radio.Button value="mind">思维导图</Radio.Button> */}
            </Radio.Group>
          </div>
        </Modal>
        <div id='docContent'>
        <BraftEditor
          value={editorState}
          onChange={this.handleEditorChange}
          onSave={this.submitContent}
          extendControls={extendControls}
          className={styles.editorBox}
          controlBarClassName={styles.controlBar}
          contentClassName={styles.content}
        />
        </div>
        
      </div>
    );
  }
}
