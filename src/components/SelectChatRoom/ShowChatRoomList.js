import React, { Component } from 'react';
import './ShowChatRoomList.css';

class ShowChatRoomList extends Component {

  render() {
    return (
        <div className="Room-List-Container">
            <p>以下為已開啟的聊天室列表：</p>
            {
                this.props.chatRoomList.map((roomName,index)=>{
                return (<p key={index} className="List-Text"> {roomName.name}</p>)
                })
            }
        </div>
    );
  }
}

export default ShowChatRoomList;
