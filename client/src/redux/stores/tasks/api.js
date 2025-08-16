import axios from "axios";

const API_URL = "http://localhost:4000";

export const fetchTasksApi = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addTaskApi = async (task) => {
  const response = await axios.post(API_URL + "/create-task", task);
  return response.data;
};


