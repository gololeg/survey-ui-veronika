import { GetTaskRequestType } from '@/services'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState = {
  allTasks: [] as GetTaskRequestType[],
  searchName: '',
  sortedTasks: [] as GetTaskRequestType[],
}

export const tasksSlice = createSlice({
  initialState,
  name: 'tasks',
  reducers: {
    setFilterBySearchName: (state, action: PayloadAction<string>) => {
      state.sortedTasks = state.sortedTasks.filter(task => task.name.includes(action.payload))
    },
    setSearchName: (state, action: PayloadAction<string>) => {
      state.searchName = action.payload
      //state.sortedTasks = state.sortedTasks.filter(task => task.name === state.searchName)
    },
    setTasks: (state, action: PayloadAction<GetTaskRequestType[]>) => {
      state.allTasks = action.payload
      state.sortedTasks = action.payload
    },
    sortTasks: (state, action: PayloadAction<string>) => {
      if (action.payload === '') {
        state.sortedTasks = state.allTasks
      }
      if (action.payload === 'asc') {
        state.sortedTasks = state.sortedTasks.sort((a, b) =>
          a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        )
      }
      if (action.payload === 'desc') {
        state.sortedTasks = state.sortedTasks
          .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
          .reverse()
      }
    },
  },
})

export const { setFilterBySearchName, setSearchName, setTasks, sortTasks } = tasksSlice.actions
