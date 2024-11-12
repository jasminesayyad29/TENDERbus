import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import './ChatPage.css';

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
 
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    const receiveMessageHandler = (data) => {
      setMessageList((list) => [...list, data]);
    };

    socket.on("receive_message", receiveMessageHandler);

    // Cleanup function to avoid duplicate listeners
    return () => {
      socket.off("receive_message", receiveMessageHandler);
    };
  }, [socket]);

  return (
    <div className="chatPageContainer">
      <div className="chatPageHeader">
        <p>Live Chat</p>
      </div>
      <div className="chatPageBody">
        <ScrollToBottom className="messageListContainer">
          {messageList.map((messageContent) => {
            return (
              <div
                className="chatMessage"
                id={username === messageContent.author ? "userMessage" : "otherMessage"}
              >
                <div>
                  <div className="chatMessageContent">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="chatMessageMeta">
                    <p id="messageTime">{messageContent.time}</p>
                    <p id="messageAuthor">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chatPageFooter">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyDown={(event) => {
            event.key === "Enter" && sendMessage();
          }}
          className="chatInput"
        />
        <button onClick={sendMessage} className="sendMessageButton">&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;
