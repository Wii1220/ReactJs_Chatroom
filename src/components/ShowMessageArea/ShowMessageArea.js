import React, { Component } from 'react';
import './ShowMessageArea.css';

class ShowMessageArea extends Component {

  render() {
    return (
        <div className="Show-Message-Area">
            {
                this.props.messages.map((message,index)=>{
                // 將 timestamp 裡的秒數 format 為想要顯示的時間格式
                let unix_timestamp = message.timestamp.seconds;
                let date = new Date(unix_timestamp * 1000);
                let hours = date.getHours();
                let minutes = '0' + date.getMinutes();
                let seconds = '0' + date.getSeconds();
                let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
                return (<p key={index}> {message.userName} 說 :『 
                            <span className="Message-Text"> {message.messageText} </span>
                            』- 
                            <span className="Timestamp"> {formattedTime} </span> 
                        </p>)
                })
            }
        </div>
    );
  }
}

export default ShowMessageArea;
