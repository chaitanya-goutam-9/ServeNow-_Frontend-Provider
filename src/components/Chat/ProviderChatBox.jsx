import React, { useState, useEffect } from 'react';
import { sendMessage, getMessagesByBookingId } from '../../api/chatApi';

const ProviderChatBox = ({ providerId, bookings }) => {
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [receiverId, setReceiverId] = useState('');

  useEffect(() => {
    if (selectedBookingId) {
      loadMessages(selectedBookingId);
    }
  }, [selectedBookingId]);

  const loadMessages = async (bookingId) => {
    const res = await getMessagesByBookingId(bookingId);
    setMessages(res.data.messages);
  };

  const handleSend = async () => {
    if (!messageText || !selectedBookingId) return;

    const payload = {
      bookingId: selectedBookingId,
      sender: 'provider',
      senderId: providerId,
      receiverId,
      message: messageText,
    };

    await sendMessage(payload);
    setMessageText('');
    loadMessages(selectedBookingId);
  };

  return (
    <div className="chat-container">
      <div className="sidebar">
        <h3>My Bookings</h3>
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className={`booking-item ${selectedBookingId === booking._id ? 'active' : ''}`}
            onClick={() => {
              setSelectedBookingId(booking._id);
              setReceiverId(booking.customerId); // Or adminId if chatting with admin
            }}
          >
            Booking ID: {booking._id}
          </div>
        ))}
      </div>

      <div className="chat-box">
        <div className="messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              <b>{msg.sender}:</b> {msg.message}
            </div>
          ))}
        </div>

        <div className="chat-input">
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Type your message..."
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default ProviderChatBox;
