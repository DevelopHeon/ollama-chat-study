import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const newMessages = [...messages, { text: input, sender: 'user' }];
    setMessages(newMessages);
    setInput('');
    setError(null);

    try {
      console.log('Sending request to Ollama...');
      const response = await axios.post('http://localhost:11434/api/generate', {
        model: 'llama3.1',
        prompt: input,
        stream: false
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Received response:', response.data);
      if (response.data && response.data.response) {
        setMessages(prevMessages => [...prevMessages, { text: response.data.response, sender: 'bot' }]);
      } else {
        setError('Unexpected response format from Ollama');
      }
    } catch (error) {
      console.error('Error:', error);
      setError(`Error: ${error.message}`);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.chatWindow}>
        {messages.map((message, index) => (
          <div key={index} style={message.sender === 'user' ? styles.userMessage : styles.botMessage}>
            <strong>{message.sender === 'user' ? 'You: ' : 'Bot: '}</strong>
            {message.text}
          </div>
        ))}
        {error && <div style={styles.errorMessage}>{error}</div>}
        <div ref={messagesEndRef} />
      </div>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          style={styles.input}
          placeholder="Type your message here..."
        />
        <button onClick={sendMessage} style={styles.button}>Send</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f0f4f8',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  chatWindow: {
    height: '500px',
    overflowY: 'scroll',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    marginBottom: '20px',
  },
  userMessage: {
    backgroundColor: '#e3f2fd',
    padding: '10px',
    borderRadius: '8px',
    marginBottom: '10px',
    maxWidth: '70%',
    alignSelf: 'flex-end',
    marginLeft: 'auto',
  },
  botMessage: {
    backgroundColor: '#f1f8e9',
    padding: '10px',
    borderRadius: '8px',
    marginBottom: '10px',
    maxWidth: '70%',
  },
  errorMessage: {
    color: '#d32f2f',
    backgroundColor: '#ffcdd2',
    padding: '10px',
    borderRadius: '8px',
    marginBottom: '10px',
  },
  inputContainer: {
    display: 'flex',
    gap: '10px',
  },
  input: {
    flex: 1,
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#4caf50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default ChatComponent;