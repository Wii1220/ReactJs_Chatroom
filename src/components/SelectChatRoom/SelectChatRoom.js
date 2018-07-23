import React, { Component } from 'react';
import {Button,Input} from 'antd';
import reactLgo from '../../logo.svg';
import firebaseLogo from '../../firebase.svg';
import './SelectChatRoom.css';

class SelectChatRoom extends Component {

  render() {
    return (
        <div>
            <div className="SelectChatRoom-Header"> Wei's Private Chatroom</div>
            <div>
                <img src={reactLgo} alt="react_logo" className="React-Logo"/>
                <img src={firebaseLogo} alt="firebase_logo" className="Firebase-Logo"/>
                <h1>React x FireBase</h1>
                <h2 style={{marginBottom:'30px'}}>Chatroom</h2>
                <Input onChange={this.props.handleChatRoomNumInput} style={{width:'35%',marginRight:'10px'}} placeholder="請輸入房間名稱"/>
                <Button onClick={this.props.changeChatRoom}>進入房間</Button>
            </div>
        </div>
    );
  }
}

export default SelectChatRoom;
