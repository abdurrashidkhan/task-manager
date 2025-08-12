import axios from "axios";

const API_BASE_URL = "http://localhost:4000";

export const createTaskAPI = async (taskData) => {
  const response = await axios.post(`${API_BASE_URL}/tasks`, taskData);
  return response.data;
};
