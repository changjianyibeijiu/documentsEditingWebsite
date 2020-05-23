import { CanvasMenu, ContextMenu, NodeMenu } from 'gg-editor';

import React from 'react';
import MenuItem from './MenuItem';
import styles from './index.less';

const MindContextMenu = () => (
  <ContextMenu className={styles.contextMenu}>
    <NodeMenu>
      <MenuItem command="append" text="主题" />
      <MenuItem command="appendChild" icon="append-child" text="子主题" />
      <MenuItem command="collapse" text="收缩" />
      <MenuItem command="expand" text="展开" />
      <MenuItem command="delete" text="删除"/>
    </NodeMenu>
    <CanvasMenu>
      <MenuItem command="undo" text="还原"/>
      <MenuItem command="redo" text="撤销"/>
    </CanvasMenu>
  </ContextMenu>
);

export default MindContextMenu;
