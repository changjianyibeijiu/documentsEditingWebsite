import React, { Component } from 'react';
import styles from './index.less';

import { Upload, message,Avatar } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}
export default class index extends Component {
  state = {
    loading: false,
  };

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };

  render() {
    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { imageUrl } = this.state;
    return (
      <div className={styles.main}>
          <div style={{fontSize:"1.5rem"}}>个人中心</div>
        <div className={styles.userInfo}>
            <div className = {styles.upload}>
            <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            // className={styles.avatar}
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={this.handleChange}
          >
            {imageUrl ? (
                <img src={imageUrl} alt="avatar" style={{width:"100%"}}/>
                // <Avatar size="large" alt='avatar' src={imageUrl}></Avatar>
            ) : (
              uploadButton
            )}
          </Upload>
            </div>
                <div className = {styles.info}>
                    {this.props.userName} | {this.props.userEmail}
                </div>
        </div>
        <div className={styles.setting}>
          <div className={styles.name}></div>
          <div className={styles.email}></div>
          <div className={styles.secure}></div>
        </div>
      </div>
    );
  }
}
