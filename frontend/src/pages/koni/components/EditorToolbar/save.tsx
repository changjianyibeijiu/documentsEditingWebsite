import React from "react";
import { withPropsAPI } from "gg-editor";
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

const { TextArea } = Input;


async function saveEditorContent(data, type, folderId, id) {
  let result = {};
  await request
    .post(`/file`, { type: type, data: data, folderId: folderId, id: id })
    .then(response => {
      result = response.data.data;
    });
  return result;
}

class Save extends React.Component {

  state = {
    id: this.props.data.id,

    folderId: this.props.data.folderId,

    name: this.props.data.name,

    type: 'koni',

    saved: false,

    createTime: this.props.data.createTime,

    editTime: '',

    visible: false,


  };




  async componentDidMount() {

    //console.log(this.props.data)
  }

  componentWillReceiveProps(props){
    this.setState({
      name: props.data.name,
      createTime: props.data.createTime,
      id: props.data.id,
      folderId: props.data.folderId,

    })
}




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
    this.handleClick();

  };

  handleCancel = e => {
    //console.log(e);
    this.setState({
      visible: false,
    });
  };



 handleClick =  async  () => {
      let { propsAPI } = this.props;
  
      //console.log(propsAPI.save());

      if (this.state.name == '') {
        this.setState({ visible: true });
      } else {
        // const rawString = this.state.editorState.toRAW();
        let data = {
          content: JSON.stringify(propsAPI.save()),
          name: this.state.name,
          createTime: this.state.createTime,
          id: this.state.id,
          editTime: Date.now(),
        };
        //console.log(data);
        const result = await saveEditorContent(data, 'koni', this.state.folderId, this.state.id);
        //console.log(result);
        
        if(result.message=="保存成功"||result.message=="修改成功"){
          message.success('保存成功');

          this.setState({
            id: this.state.id?this.state.id:result.id,
            folderId: this.state.folderId?this.state.folderId:result.folderId ? result.folderId : '',
          });
          this.props.data.updata(result);
        }
        else{
          message.error('请重试');

        }

    
        

  

      }



    };
  
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
              defaultValue="koni"
              buttonStyle="solid"
              onChange={this.type}
            >
              {/* <Radio.Button value="word">Word</Radio.Button> */}
              {/* <Radio.Button value="md">Markdown</Radio.Button>
              <Radio.Button value="excel">表格</Radio.Button>
              <Radio.Button value="flowSheet">流程图</Radio.Button> */}
              {/* <Radio.Button value="mind">思维导图</Radio.Button> */}
              <Radio.Button value="koni">拓扑图</Radio.Button>

            </Radio.Group>
          </div>
        </Modal>
        <Button type='link' onClick = {this.handleClick}>保存</Button>

        </div>
       
      );
    }
  }
  
  export default withPropsAPI(Save);
