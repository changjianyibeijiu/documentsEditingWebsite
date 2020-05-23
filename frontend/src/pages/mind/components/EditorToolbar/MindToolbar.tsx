import { Divider,Button} from 'antd';
import React from 'react';
import { Toolbar } from 'gg-editor';

import Save from './save';

import ToolbarButton from './ToolbarButton';
import styles from './index.less';


const FlowToolbar = (props) => (
  <Toolbar className={styles.toolbar}>
    <ToolbarButton command="undo" text='撤销'/>
    <ToolbarButton command="redo" text='还原'/>
    <Divider type="vertical" />
    <ToolbarButton command="zoomIn" icon="zoom-in" text="放大" />
    <ToolbarButton command="zoomOut" icon="zoom-out" text="缩小" />
    <ToolbarButton command="autoZoom" icon="fit-map" text="充满屏幕" />
    <ToolbarButton command="resetZoom" icon="actual-size" text="真实大小" />
    <Divider type="vertical" />
    <ToolbarButton command="append" text="主题" />
    <ToolbarButton command="appendChild" icon="append-child" text="子主题" />
    <Divider type="vertical" />
    <ToolbarButton command="collapse" text="收拢" />
    <ToolbarButton command="expand" text="展开" />
    <Divider type="vertical" />
    <ToolbarButton command='delete'  text="删除" />
    <Save data = {props.data}></Save>
  </Toolbar>
);

export default FlowToolbar;
