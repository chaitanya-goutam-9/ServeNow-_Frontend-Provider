import React, { useState } from 'react';

const ChatInput = ({ onSend }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() !== '') {
      onSend(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex' }}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        style={{
          flex: 1,
          padding: '10px',
          fontSize: '14px',
          borderRadius: '4px',
          border: '1px solid #ccc'
        }}
      />
      <button
        type="submit"
        style={{
          marginLeft: '8px',
          padding: '10px 16px',
          backgroundColor: '#1976d2',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Send
      </button>
    </form>
  );
};

export default ChatInput;
