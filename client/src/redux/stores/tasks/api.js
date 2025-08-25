import axios from "axios";

// const API_URL = "https://tasks-manager-v1.vercel.app";
const API_URL = "http://localhost:4000";

export const fetchTasksApi = async () => {
  const response = await axios.get(API_URL + "/tasks");
  return response.data;
};

export const addTaskApi = async (task) => {
  const response = await axios.post(API_URL + "/create-task", task);
  return response.data;
};
// Update task status
export const updateTaskApi = async (taskId, newStatus) => {
  const response = await axios.put(`${API_URL}/update-status/${taskId}`, { status: newStatus });
  return response.data;
};

