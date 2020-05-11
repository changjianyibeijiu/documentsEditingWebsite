import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import styles from './index.less';

import request from '@/utils/request';

import { PluginComponent } from 'react-markdown-editor-lite';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

class Save extends PluginComponent<CounterState> {
  // 这里定义插件名称，注意不能重复
  static pluginName = '保存';
  // 定义按钮被防止在哪个位置，默认为左侧，还可以放置在右侧（right）
  static align = 'left';

  constructor(props: any) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // 调用API，往编辑器中插入一个数字
    console.log(this.editor.state);
    request.post('/save', { type: 'md', data: '' });
  }

  render() {
    return (
      <span
        className="button button-type-counter"
        title="保存"
        onClick={this.handleClick}
      >
        保存
      </span>
    );
  }
}

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

MdEditor.use(Save);
// Finish!
function handleEditorChange({ html, text }) {
  console.log('handleEditorChange', html, text);
}
export default props => {
  return (
    <div className={styles.mdBox}>
      <MdEditor
        value=""
        style={{ height: '98vh', width: '100%', backgroundColor: '#ffc' }}
        renderHTML={text => mdParser.render(text)}
        onChange={handleEditorChange}
      />
    </div>
  );
};
