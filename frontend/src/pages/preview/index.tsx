import React from 'react';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import styles from './index.less';

import request from '@/utils/request';

async function fetchEditorContent(id, folderId) {
  let data = {};
  await request.get(`/file?id=${id}&folderId=${folderId}`).then(response => {
    data = response.data.data;
  });
  // console.log(`find file ${data}`);
  return data;
}

export default class EditorPage extends React.Component {
  state = {
    html: '',
    // editorState: BraftEditor.createEditorState(null),
  };

  async componentDidMount() {
    const id = this.props.match.params.id;
    console.log(this.props.match.params.folderId);
    const folderId = this.props.match.params.folderId
      ? this.props.match.params.folderId
      : false;

    let data = await fetchEditorContent(id, folderId);

    let rawContent = data.content;

    this.setState({
      // editorState: BraftEditor.createEditorState(rawContent),
      html: BraftEditor.createEditorState(rawContent).toHTML(),
    });

    // 使用BraftEditor.createEditorState将html字符串转换为编辑器需要的editorState数据
  }

  render() {
    return (
      <div className={styles.box}>
        <div className={styles.content}>
          <div dangerouslySetInnerHTML={{ __html: this.state.html }} />
        </div>
      </div>
    );
  }
}
