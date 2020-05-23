import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import styles from './index.less';

import request from '@/utils/request';

import {
  Button,
  Card,
  List,
  Typography,
  Modal,
  Form,
  Input,
  Layout,
  Radio,
  message
} from 'antd';

import { PluginComponent } from 'react-markdown-editor-lite';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

let cid = '';

let cfolderId = '';

let name = '';

let createTime;

let editTime;

class Save extends PluginComponent<CounterState> {
  // 这里定义插件名称，注意不能重复
  static pluginName = '保存';
  // 定义按钮被防止在哪个位置，默认为左侧，还可以放置在右侧（right）
  static align = 'left';

  constructor(props: any) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  state = {
    type: 'md',

    saved: false,

    visible: false,
  };

  inputChange = e => {
    //console.log('input change');
    //console.log(e.target.value);
    name = e.target.value;
    // this.setState({ name: e.target.value });
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
    // this.submitContent();
    this.handleClick();
  };

  handleCancel = e => {
    //console.log(e);
    this.setState({
      visible: false,
    });
  };

  async handleClick() {
    // 调用API，往编辑器中插入一个数字
    // //console.log(this.editor.parent);
    // request.post('/file', { type: 'md', data: this.editor.state.text, }).then((response)=>{//console.log(response)});
    if (name == '') {
      this.setState({ visible: true });
    } else {
      // const rawString = this.state.editorState.toRAW();
      let data = {
        content: this.editor.state.text,
        name: name,
        createTime: createTime,
        id: cid,
        editTime: Date.now(),
      };
      //console.log(data);
      const result = await saveEditorContent(data, 'md', cfolderId, cid);
      //console.log(result);
      // this.setState({
      //   id: this.state.id?this.state.id:result.id,
      //   folderId: this.state.folderId?this.state.folderId:result.folderId ? result.folderId : '',
      //   savebutton: 'disabled',
      // });
      console.log(result)
      if(result){
        message.success(result.message);
      }
  

      cid = cid ? cid : result.id;
      cfolderId = cfolderId ? cfolderId : result.folderId?result.folderId:'';
    }
  }

  render() {
    return (
      <div>
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
              defaultValue="md"
              buttonStyle="solid"
              onChange={this.type}
            >
              {/* <Radio.Button value="word">Word</Radio.Button> */}
              <Radio.Button value="md">Markdown</Radio.Button>
              {/* <Radio.Button value="excel">表格</Radio.Button>
              <Radio.Button value="flowSheet">流程图</Radio.Button>
              <Radio.Button value="mind">思维导图</Radio.Button> */}
            </Radio.Group>
          </div>
        </Modal>

        <span
          className="button button-type-counter"
          title="保存"
          onClick={this.handleClick}
        >
          保存
        </span>
      </div>
    );
  }
}

class Print extends PluginComponent<CounterState> {
  // 这里定义插件名称，注意不能重复
  static pluginName = '打印';
  // 定义按钮被防止在哪个位置，默认为左侧，还可以放置在右侧（right）
  static align = 'left';

  constructor(props: any) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }


  async handleClick() {
    // 调用API，往编辑器中插入一个数字
    // //console.log(this.editor.parent);
    // request.post('/file', { type: 'md', data: this.editor.state.text, }).then((response)=>{//console.log(response)});
          window.document.body.innerHTML =this.editor.state.html;
          window.print();
          window.location.reload();
  }

  render() {
    return (
      <div>
        <span
          className="button button-type-counter"
          title="打印前，请先保存文档"
          onClick={this.handleClick}
        >
          打印
        </span>
      </div>
    );
  }
}


// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

MdEditor.use(Save);
MdEditor.use(Print);

// Finish!
function handleEditorChange({ html, text }) {
  // //console.log('handleEditorChange', html, text);
}

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

export default class MdEditorClass extends React.Component {
  constructor(props: any) {
    super(props);
  }
  state = {
    type: 'md',

    value: '',
  };

  async componentDidMount() {
    cid = '';

    cfolderId = '';

    name = '';

    createTime='';

    editTime='';
    document.title = 'Markdown-'+name;

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
        value: rawContent,
      });

      name = data.name;
      cid = data.id;
      createTime = data.createTime;
      cfolderId = data.folderId ? data.folderId : false;
    } else if (!id) {
      this.setState({
        // editorState: BraftEditor.createEditorState(null),
        // saved: false,
        value: '',
        share: false,
      });

      createTime = new Date();
      editTime = Date.now();
      name = '';
    } else {
      this.setState({
        // saved: false,
        value: '',
        share: false,
      });
      createTime = new Date();
      editTime = Date.now();
      name = '';
    }
  }

  render() {
    return (
      <div>
        <div className={styles.mdBox}>
          <MdEditor
            value={this.state.value}
            style={{ height: '98vh', width: '100%', backgroundColor: '#ffc' }}
            renderHTML={text => mdParser.render(text)}
            onChange={handleEditorChange}
          />
        </div>
      </div>
    );
  }
}
