import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: []
}
const tasks = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, { payload }) => {
      if (state.tasks.length === 0) {
        state.tasks.push({ id: 1, ...payload })
      } else {
        const generateId = state.tasks.at(-1);
        state.tasks.push({ id: generateId.id + 1, ...payload })
      }
    },
    removeTask: (state, { payload }) => {
      state.tasks.filter(item => {
        item.id !== payload
      })
    }
  },
})
export const { addTask } = tasks.actions
export default tasks.reducer;