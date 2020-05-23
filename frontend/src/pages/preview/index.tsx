import React from 'react';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import styles from './index.less';

import request from '@/utils/request';

import GGEditor, { Mind,Flow,Koni } from 'gg-editor';

// import react, react-markdown-editor-lite, and a markdown parser you like
import * as ReactDOM from 'react-dom'
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

async function fetchEditorContent(id, folderId) {
  let data = {};
  await request.get(`/file?id=${id}&folderId=${folderId}`).then(response => {
    data = response.data.data;
  });
  // //console.log(`find file ${data}`);
  return data;
}

export default class EditorPage extends React.Component {
  state = {
    html: '',
    type: 'word',
    content: {},
    // editorState: BraftEditor.createEditorState(null),
  };

  async componentDidMount() {
    const id = this.props.match.params.id;
    //console.log(this.props.match.params.folderId);
    const folderId = this.props.match.params.folderId
      ? this.props.match.params.folderId
      : false;

    let data = await fetchEditorContent(id, folderId);

    if (data.type == 'word') {
      //console.log('word类型文档')
      let rawContent = data.content;
      this.setState({
        // editorState: BraftEditor.createEditorState(rawContent),
        html: BraftEditor.createEditorState(rawContent).toHTML(),
        type: data.type,
      });

    }
    else if (data.type == 'md') {
      //console.log(mdParser.render(data.content));
      this.setState({
        html: mdParser.render(data.content),
        type: data.type,

      });
    } else if (data.type == 'mind') {
      //console.log(mdParser.render(data.content));
      this.setState({
        content: JSON.parse(data.content),
        type: data.type,

      });
    } else if (data.type == 'flow') {
      //console.log(mdParser.render(data.content));
      this.setState({
        content: JSON.parse(data.content),
        type: data.type,


      });
    } else if (data.type == 'koni') {
      //console.log(mdParser.render(data.content));
      this.setState({
        content: JSON.parse(data.content),
        type: data.type,


      });
    }
    else {
      let rawContent = data.content;
      this.setState({
        // editorState: BraftEditor.createEditorState(rawContent),
        html: BraftEditor.createEditorState(rawContent).toHTML(),
        type: data.type,

      });

    }


    // 使用BraftEditor.createEditorState将html字符串转换为编辑器需要的editorState数据
  }

  render() {
    return (

      <div className={styles.box}>
        <div>
          {this.state.type == "word" || this.state.type == "md" ?<div className={styles.content} id='content'> <div dangerouslySetInnerHTML={{ __html: this.state.html }} /> <div className={styles.print} onClick={() => {
          window.document.body.innerHTML = document.getElementById("content").innerHTML;
          window.print();
          window.location.reload();
        }}>打 印</div>
            </div>: this.state.type=="mind"?<GGEditor>
          <Mind style={{ width: '98vw', height: "98vh" }} data={this.state.content} />
        </GGEditor>:this.state.type=="flow"?<GGEditor>
          <Flow style={{ width: '98vw', height: "98vh" }} data={this.state.content} />
        </GGEditor>:this.state.type=="koni"?<GGEditor>
          <Koni style={{ width: '98vw', height: "98vh" }} data={this.state.content} />
        </GGEditor>:<div dangerouslySetInnerHTML={{ __html: this.state.html }} />}

        </div>
        
      </div>
    );
  }
}

