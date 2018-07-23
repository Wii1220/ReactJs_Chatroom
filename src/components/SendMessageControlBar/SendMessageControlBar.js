import React, { Component } from 'react';
import {Button,Input} from 'antd';
import './SendMessageControlBar.css';

class SendMessageControlBar extends Component {
  render() {
    return (
        <div style={{paddingBottom:'20px'}}>
            <Input className="Name-Input" onChange={this.props.handleUseNameChange} placeholder="輸入名字"/>
            <Input className="Message-Input" onChange={this.props.handleMessageInputChange} value={this.props.messageInput} placeholder="輸入訊息"/>
            <Button className="Send-Button" onClick={this.props.sentMessageInput}>送出</Button>
        </div>
    );
  }
}

export default SendMessageControlBar;
