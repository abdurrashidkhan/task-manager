import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: []
}
const tasks = createSlice({
  name: 'tasks',
  initialState,
  reducers: {

  }
})
export default tasks.reducer;