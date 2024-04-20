import { Sort } from '@/components/ui'
import { GetTaskRequestType } from '@/services'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const storedTasks = localStorage.getItem('tasks')
let parsedTasks: GetTaskRequestType[] = []

if (storedTasks) {
  parsedTasks = JSON.parse(storedTasks)
}

const initialState = {
  allTasks: parsedTasks || ([] as GetTaskRequestType[]),
  searchName: localStorage.getItem('searchName') || '',
  selectValue: localStorage.getItem('selectCount') || 'All tasks',
  sortValues: { direction: '', key: '' } as Sort,
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
    setSortValues: (state, action: PayloadAction<Sort>) => {
      state.sortValues = action.payload || { direction: '', key: '' }
    },
    setTasks: (state, action: PayloadAction<GetTaskRequestType[]>) => {
      state.allTasks = action.payload
      state.sortedTasks = action.payload
    },
    sortTasks: (state, action: PayloadAction<{ direction: string; key: string }>) => {
      if (action.payload.direction === '') {
        state.sortedTasks =
          state.selectValue === 'All tasks'
            ? state.allTasks
                .filter(task => task.name.toLowerCase().includes(state.searchName.toLowerCase()))
                .slice()
            : state.allTasks
                .filter(task => task.name.toLowerCase().includes(state.searchName.toLowerCase()))
                .slice(0, +state.selectValue)
      }
      if (action.payload.direction === 'asc') {
        if (action.payload.key === 'name') {
          state.sortedTasks = state.sortedTasks.sort((a, b) =>
            a.name.toLowerCase().localeCompare(b.name.toLowerCase())
          )
        } else if (action.payload.key === 'type') {
          state.sortedTasks = state.sortedTasks.sort((a, b) =>
            a.type.name.toLowerCase().localeCompare(b.type.name.toLowerCase())
          )
        } else if (action.payload.key === 'level') {
          state.sortedTasks = state.sortedTasks.sort((a, b) =>
            a.level.name.toLowerCase().localeCompare(b.level.name.toLowerCase())
          )
        }
      }
      if (action.payload.direction === 'desc') {
        state.sortedTasks = state.sortedTasks.reverse()
      }
    },
  },
})

export const {
  setFilterBySearchName,
  setSearchName,
  setSelectValue,
  setSortValues,
  setTasks,
  sortTasks,
} = tasksSlice.actions
