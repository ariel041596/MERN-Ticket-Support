// Communucate to server
import axios from "axios";

const API_URL = "/api/tickets/";

// Create New Ticket
const createTicket = async (ticketData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, ticketData, config);
  return response.data;
};
// Get user tickets
const getTickets = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};
// Get user ticket
const getTicket = async (ticketID, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + ticketID, config);
  return response.data;
};
// Closed user ticket
const closedTicket = async (ticketID, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    API_URL + ticketID,
    { status: "closed" },
    config
  );
  return response.data;
};
const ticketService = {
  createTicket,
  getTickets,
  getTicket,
  closedTicket,
};

export default ticketService;
