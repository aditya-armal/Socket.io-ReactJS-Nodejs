import "./App.css";
import io from "socket.io-client";
import { Menu,Segment } from 'semantic-ui-react';
import { useEffect, useState } from "react";

const socket = io.connect("http://localhost:3001");

function App() {
  //Room State
  const [room, setRoom] = useState("");
  const [currentRoom, setCurrentRoom] = useState("");
  const [disabled, setDisabled] = useState(true);

  // Messages States
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState([]);

  const joinRoom = () => {
    setCurrentRoom(room);
    if (room !== "") {
      socket.emit("join_room", room);
      setDisabled(false);
    }
  };
  const leaveRoom = () => {
    setRoom('')
    setCurrentRoom('');
    setMessageReceived('');
  };

  const sendMessage = () => {
    if(message!=='')
    socket.emit("send_message", { message, room });
    setMessage('');
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      const newMessage = {
        userId: data.userId,
        text: data.message,
        datetime: new Date().toLocaleString(),
      };

      // Use the spread operator to create a new array with the new message added
      setMessageReceived((prevMessages) => [...prevMessages, newMessage]);
      
    });
    
    // Clean up the socket listener when the component unmounts
    return () => {
      socket.off('receive_message');
    };
  }, []);
  return (
    <>
      <Menu inverted>
          <Menu.Item header>Chatting App using Socket.io</Menu.Item>
              <div style={{textAlign:'center'}}>
                  <p style={{ margin: 15, color: 'white' }}>
                      Current Room Number: {(currentRoom==="")?"No Room Joined!!":currentRoom}
                  </p>
              </div>
          <Menu.Item position="right">
          {
              currentRoom==="" ?
                  <div className="ui left icon input">
                      <input type="Number" placeholder="Room Number..." onChange={(event) => {
                      setRoom(event.target.value);
                      }}/>
                      <i className="users icon"></i>
                      <button className="ui primary button" onClick={joinRoom}>Join</button>
                  </div>
              :<button className="ui red button" onClick={leaveRoom}>Leave Room</button>
          }
          </Menu.Item>
      </Menu>
      
      {/* <div style={{textAlign:"center"}}> */}
      <div className="ui feed">
      {messageReceived.length > 0 ? (
        messageReceived.map((message, index) => (
          <div className="event" key={index}>
            <div className="label">
              <img className="ui avatar image" src={require("./images/default-avatar.jpg")} alt="Avatar"/>
            </div>
            <div className="content">
              <div className="summary">
                {message.userId} sent a message: {message.text}
                <div className="date">{message.datetime}</div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No messages available</p>
      )}
    </div>

      <Segment inverted vertical style={{ position: 'fixed', bottom: 0, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="ui fluid action input" style={{ width:'80%'}}>
            <input type="text" placeholder="Type Message..." disabled={disabled} value={message} onChange={(event) => {
            setMessage(event.target.value);
            }}/>
            <div className={`${disabled ? 'ui disabled button' : 'ui primary button'}`} disabled={disabled} onClick={sendMessage}>Send Message</div>
        </div>
    </Segment>
    </>
  );
}

export default App;
