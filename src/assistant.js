import React, { useState } from 'react';
import axios from 'axios'; // Make sure to install axios: npm install axios
import msg from './assets/msg.png';
import './assistant.css';
const PopupChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      // Simulate receiving a welcome message when chat is opened
      handleReceiveMessage('Hello! How can I help you?');
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() === '') {
      return;
    }
  
    const newMessages = [...messages, { content: inputValue, role: 'user' }];
    setMessages(newMessages);
    setInputValue('');
  
    try {
      const response = await axios.post('http://127.0.0.1:5000/assistant', { messages: newMessages }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const botResponse = response.data.generated_response;
  
      // Ensure logging the correct messages array
      setMessages([...newMessages, { content: botResponse, role: 'assistant' }], () => {
        console.log(newMessages);
      });
    } catch (error) {
      console.error('Error sending message to the backend:', error);
    }
  };
  

  const handleReceiveMessage = (text) => {
    const newMessages = [...messages, {content: text, role: 'assistant' }];
    setMessages(newMessages);
    console.log(newMessages);
  };

  return (
    <div className="popup-chatbot">
        <button className="chat-button" onClick={toggleChat}>
          <img src={msg} alt="assistant" width="25" height="25"/>
        </button>
      {isOpen && (
        <div className="chat-container">
          <div className="chat-messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.role}`}>
                {message.content}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={inputValue}
              onChange={handleInputChange}
            />
            <button onClick={handleSendMessage} className='send-button'>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupChatbot;
