import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function Messages() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const { bookingId } = useParams(); // Get bookingId from URL
  const navigate = useNavigate();

  // Check if token is expired
  const isTokenExpired = (token) => {
    try {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      return decoded.exp * 1000 < Date.now();
    } catch (err) {
      return true;
    }
  };

  // Fetch messages for the booking
  const fetchMessages = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found. Please log in again.');
      }
      if (isTokenExpired(token)) {
        localStorage.removeItem('token');
        navigate('/login');
        return;
      }
      const response = await axios.get(`http://localhost:5000/api/chat/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(response.data.messages || []);
    } catch (error) {
      const message = error.response?.data?.error || error.message || 'Failed to fetch messages.';
      setErrorMsg(message);
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  // Send a new message
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setErrorMsg('');
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found. Please log in again.');
      }
      if (isTokenExpired(token)) {
        localStorage.removeItem('token');
        navigate('/login');
        return;
      }

      // Decode token to get user role and ID
      const decoded = JSON.parse(atob(token.split('.')[1]));
      const sender = decoded.user.role; // 'admin', 'customer', or 'provider'
      const senderId = decoded.user.id;

      // For simplicity, assume receiverId is fetched from booking or context
      // Replace 'receiverId' with actual logic to determine the recipient
      const receiverId = 'replace_with_actual_receiver_id'; // TODO: Implement logic to get receiverId

      const response = await axios.post(
        'http://localhost:5000/api/chat/send',
        {
          bookingId,
          sender,
          senderId,
          receiverId,
          message: newMessage,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessages([...messages, response.data.chat]);
      setNewMessage('');
    } catch (error) {
      const message = error.response?.data?.error || error.message || 'Failed to send message.';
      setErrorMsg(message);
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
      console.error('Error sending message:', error);
    }
  };

  useEffect(() => {
    fetchMessages();
    // Optionally, poll for new messages every 5 seconds
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [bookingId]);

  return (
    <div className="max-w-4xl mx-auto mt-6 px-6">
      <h3 className="text-2xl font-bold mb-4">Messages for Booking #{bookingId}</h3>

      {loading && <p className="text-blue-600">Loading messages...</p>}
      {errorMsg && <p className="text-red-600 mb-4">{errorMsg}</p>}

      {/* Chat Messages */}
      <div className="bg-white shadow-md rounded-lg h-96 overflow-y-auto mb-4 p-4">
        {messages.length === 0 ? (
          <p className="text-gray-600">No messages yet.</p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg._id}
              className={`mb-4 p-3 rounded-lg ${
                msg.sender === 'admin' ? 'bg-blue-100 ml-auto' : 'bg-gray-100'
              } max-w-[70%]`}
            >
              <p className="text-sm font-semibold capitalize">{msg.sender}</p>
              <p>{msg.message}</p>
              <p className="text-xs text-gray-500">
                {new Date(msg.timestamp).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Message Input */}
      <form onSubmit={sendMessage} className="flex items-center">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default Messages;