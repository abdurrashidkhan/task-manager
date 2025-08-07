import {configureStore} from '@reduxjs/toolkit'
import tasks from '../task/task'
const store = configureStore({
  reducer:{
    tasks: tasks
  },
})

export default store