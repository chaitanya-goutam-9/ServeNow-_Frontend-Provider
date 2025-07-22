import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/chat';

export const sendMessage = async (payload) => {
  return await axios.post(`${BASE_URL}/send`, payload);
};

export const getMessagesByBookingId = async (bookingId) => {
  return await axios.get(`${BASE_URL}/${bookingId}`);
};
