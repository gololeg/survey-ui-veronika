import { RootState } from '@/services'

export const selectAllTasks = (state: RootState) => state.tasks.allTasks
export const selectSortedTasks = (state: RootState) => state.tasks.sortedTasks
export const selectSearchName = (state: RootState) => state.tasks.searchName
export const selectSelectValue = (state: RootState) => state.tasks.selectValue
export const selectSort = (state: RootState) => state.tasks.sortValues
