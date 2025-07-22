import React from 'react';

const MessageList = ({ messages, currentUserId }) => {
  return (
    <div>
      {messages.map((msg, idx) => (
        <div
          key={idx}
          style={{
            display: 'flex',
            justifyContent: msg.senderId === currentUserId ? 'flex-end' : 'flex-start',
            marginBottom: '8px',
          }}
        >
          <div
            style={{
              backgroundColor: msg.senderId === currentUserId ? '#d1ffd1' : '#e1e1e1',
              padding: '8px 12px',
              borderRadius: '16px',
              maxWidth: '60%',
              fontSize: '14px'
            }}
          >
            <b>{msg.sender}</b>: {msg.message}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
