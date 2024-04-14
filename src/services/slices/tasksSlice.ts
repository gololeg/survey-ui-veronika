import { GetTaskRequestType } from '@/services'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState = {
  allTasks: [] as GetTaskRequestType[],
  searchName: localStorage.getItem('searchName') || '',
  selectValue: localStorage.getItem('selectCount') || 'All tasks',
  sortedTasks: [] as GetTaskRequestType[],
}

export const tasksSlice = createSlice({
  initialState,
  name: 'tasks',
  reducers: {
    setFilterBySearchName: (state, action: PayloadAction<string>) => {
      state.sortedTasks = state.sortedTasks.filter(task =>
        task.name.toLowerCase().includes(action.payload.toLowerCase())
      )
    },
    setSearchName: (state, action: PayloadAction<string>) => {
      state.searchName = action.payload
    },
    setSelectValue: (state, action: PayloadAction<string>) => {
      state.selectValue = action.payload
    },
    setTasks: (state, action: PayloadAction<GetTaskRequestType[]>) => {
      state.allTasks = action.payload
      state.sortedTasks = action.payload
    },
    setTasksCountBySelect: (state, action: PayloadAction<string>) => {
      state.sortedTasks =
        action.payload === 'All tasks'
          ? state.allTasks
              .slice()
              .filter(task => task.name.toLowerCase().includes(state.searchName.toLowerCase()))
          : state.allTasks
              .slice(0, +action.payload)
              .filter(task => task.name.toLowerCase().includes(state.searchName.toLowerCase()))
    },
    sortTasks: (state, action: PayloadAction<string>) => {
      if (action.payload === '') {
        state.sortedTasks =
          state.selectValue === 'All tasks'
            ? state.allTasks
                .slice()
                .filter(task => task.name.toLowerCase().includes(state.searchName.toLowerCase()))
            : state.allTasks
                .slice(0, +state.selectValue)
                .filter(task => task.name.toLowerCase().includes(state.searchName.toLowerCase()))
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

export const {
  setFilterBySearchName,
  setSearchName,
  setSelectValue,
  setTasks,
  setTasksCountBySelect,
  sortTasks,
} = tasksSlice.actions
