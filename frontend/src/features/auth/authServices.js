import axios from "axios";
// Communucate to server

const API_URL = "/api/users/";

// Register User
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
// Login User
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Logout User
const logoutUser = () => localStorage.removeItem("user");

const authService = {
  register,
  logoutUser,
  login,
};

export default authService;
