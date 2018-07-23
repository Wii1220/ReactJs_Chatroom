import React, { Component } from 'react';
import {Button} from 'antd';
import './ChatRoomHeader.css';

class ChatRoomHeader extends Component {

  render() {
    return (
       <div className="Chat-Room-Header-Container">
            <div className="Room-Id-Container" >
              <p>房間編號：{this.props.roomId}</p>
            </div>
            <div className="Left-Button">
              <Button onClick={this.props.leftRoom}>離開聊天室</Button>
            </div>
        </div>
    );
  }
}

export default ChatRoomHeader;
