import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import fire from '../firebase';
// import {Button,Input} from 'antd'; // import Ant Design 的樣式進來 (App.css 那也要記得 import)
import ChatRoomHeader from '../components/ChatRoomHeader/ChatRoomHeader';
import ShowMessageArea from '../components/ShowMessageArea/ShowMessageArea';
import SendMessageControlBar from '../components/SendMessageControlBar/SendMessageControlBar';
import SelectChatRoom from '../components/SelectChatRoom/SelectChatRoom';
import ShowChatRoomList from '../components/SelectChatRoom/ShowChatRoomList';
import SelectChatRoomFooter from '../components/SelectChatRoom/SelectChatRoomFooter';


const db = fire.firestore();
const settings = {timestampsInSnapshots: true};
db.settings(settings);
let unsubscribe; // 用來接 firebase 持續監聽的函式

class App extends Component {
  state ={
    messages:[],
    userNameInput:'',
    messageInput:'',
    page:'outRoom',
    roomId:'chatroom01',
    chatRoomList:[],
  }

  
  componentDidMount=()=>{
    let listenAddMessage = db.collection('chatroom').doc(this.state.roomId).collection('message').orderBy('timestamp');
    // onSnapshot 為一直監聽 firebase 裡的資料有沒有更新。
    // 把 unsubscribe 重新執行一次，可以重新監聽
      unsubscribe = listenAddMessage.onSnapshot((snapshot) => {
      let messages = this.state.messages;
      snapshot.docChanges().forEach(change => { 
        if(change.type==='added'){
        messages.push(change.doc.data());
        console.log(change.doc.id, '=>', change.doc.data()); 
        }
      });
      this.setState({messages:messages});
      window.scrollTo(0,99999);
      console.log(this.state.messages);
    });
    
    // 監聽房間名稱，並把房間名稱存進 chatRoomList[] 裡
    let listenChatRooms = db.collection('chatroom');
    listenChatRooms.onSnapshot((snapshot) => {
      let chatRoomList = [];
      snapshot.docChanges().forEach(change => { 
        if(change.type==='added'){
        chatRoomList.push(change.doc.data());
        console.log(change.doc.id, '=>', change.doc.data()); 
        }
      });
      this.setState({chatRoomList:chatRoomList});
      console.log(this.state.chatRoomList);
    });    
    
  }

  handleUseNameChange = (event)=>{
    this.setState({
      userNameInput:event.target.value
    })
  }
  handleMessageInputChange =(event)=>{
    this.setState({
      messageInput:event.target.value
    })
  }

  sentMessageInput=()=>{
        db.collection('chatroom').doc(this.state.roomId).collection('message').add({ 
        userName:this.state.userNameInput,
        messageText:this.state.messageInput,
        timestamp:new Date(),
      }).then(ref => {
      console.log('Added document with ID: ', ref.id);
        this.setState({
          messageInput:''
        });
    });
    console.log(this.state.userNameInput);
    console.log(this.state.messageInput);
  }

  leftRoom=()=>{
    this.setState({page:'outRoom'});
  }

  handleChatRoomNumInput=(event)=>{
    this.setState({roomId:event.target.value})
  }

  changeChatRoom=()=>{
    unsubscribe();
    let newRoomId = this.state.roomId;
    this.setState({page:'inRoom',roomId:newRoomId,messages:[]});
    let listenAddMessage = db.collection('chatroom').doc(newRoomId).collection('message').orderBy('timestamp');
    listenAddMessage.onSnapshot((snapshot) => {
      let messages = this.state.messages;
      snapshot.docChanges().forEach(change => { 
        if(change.type==='added'){
        messages.push(change.doc.data());
        console.log(change.doc.id, '=>', change.doc.data()); 
        }
      });
      this.setState({messages:messages});

      //儲存新的 chatRoom Name 到 firebase
      db.collection('chatroom').doc(newRoomId).set({ 
        name:newRoomId,
      }).then(ref => {
      // console.log('Added New ChatRoom Name: ', ref.name);
       });
      // 視窗可視範圍 scroll 到 Y軸 99999 座標位置 (藉此做到將視窗可視範圍移動到聊天室最下方)
      window.scrollTo(0,99999); 
      console.log(this.state.messages);
    });    
  }

  render() {
    return (
      <div className="App">
        
        {this.state.page === "inRoom" ?
        <div>
          <ChatRoomHeader roomId={this.state.roomId} leftRoom={this.leftRoom}/>
          <ShowMessageArea messages={this.state.messages} />
          <SendMessageControlBar 
            handleUseNameChange={this.handleUseNameChange} 
            handleMessageInputChange={this.handleMessageInputChange}
            messageInput={this.state.messageInput}
            sentMessageInput={this.sentMessageInput}/>
        </div>
          : 
        <div>  
          <div className="Select-Chatroom-Page-Container">
            <SelectChatRoom handleChatRoomNumInput={this.handleChatRoomNumInput} changeChatRoom={this.changeChatRoom} />
            <ShowChatRoomList chatRoomList={this.state.chatRoomList}/>          
          </div>
          <SelectChatRoomFooter/>  
        </div>
        }
      </div>
    );
  }
}

export default App;
