import { Divider } from 'antd';
import React from 'react';
import { Toolbar } from 'gg-editor';
import ToolbarButton from './ToolbarButton';
import styles from './index.less';
import Save from './save';

const FlowToolbar = (props) => (
  <Toolbar className={styles.toolbar}>
    <ToolbarButton command="undo" text="还原"/>
    <ToolbarButton command="redo" text="撤销"/>
    <Divider type="vertical" />
    <ToolbarButton command="copy" />
    <ToolbarButton command="paste" />
    <ToolbarButton command="delete" />
    <Divider type="vertical" />
    <ToolbarButton command="zoomIn" icon="zoom-in" text="Zoom In" />
    <ToolbarButton command="zoomOut" icon="zoom-out" text="Zoom Out" />
    <ToolbarButton command="autoZoom" icon="fit-map" text="Fit Map" />
    <ToolbarButton command="resetZoom" icon="actual-size" text="Actual Size" />
    <Divider type="vertical" />
    <ToolbarButton command="toBack" icon="to-back" text="To Back" />
    <ToolbarButton command="toFront" icon="to-front" text="To Front" />
    <Divider type="vertical" />
    <ToolbarButton command="multiSelect" icon="multi-select" text="Multi Select" />
    <ToolbarButton command="addGroup" icon="group" text="Add Group" />
    <ToolbarButton command="unGroup" icon="ungroup" text="Ungroup" />
    <Save data = {props.data}></Save>
  </Toolbar>
);

export default FlowToolbar;
