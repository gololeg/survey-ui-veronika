import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

import { Input, Select, TasksTable, Typography } from '@/components/ui'
import { useDebounce } from '@/hooks'
import { useAppDispatch, useAppSelector, useGetTasksQuery } from '@/services'
import { selectSearchName, selectSelectValue, selectSortedTasks } from '@/services/selectors'
import { setFilterBySearchName, setSearchName, setSelectValue, setTasks } from '@/services/slices'

import style from './tasksPage.module.scss'

export const TasksPage = () => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const { data, error, isLoading } = useGetTasksQuery()
  const sortedTasks = useAppSelector(selectSortedTasks)
  const searchName = useAppSelector(selectSearchName)
  const selectValue = useAppSelector(selectSelectValue)
  const debouncedSearchValue = useDebounce(searchName, 500)
  const selectOptions = [
    {
      label: 'all',
      value: 'All tasks',
    },
    {
      label: '10',
      value: '10',
    },
    {
      label: '20',
      value: '20',
    },
    {
      label: '50',
      value: '50',
    },
  ]

  useEffect(() => {
    data && dispatch(setTasks(data))
  }, [data])

  useEffect(() => {
    if (debouncedSearchValue || searchName) {
      if (searchName) {
        dispatch(setFilterBySearchName(searchName))
      }
      dispatch(setFilterBySearchName(debouncedSearchValue))
      localStorage.setItem('searchName', debouncedSearchValue)
    } else {
      localStorage.removeItem('searchName')
    }
  }, [debouncedSearchValue, data])

  useEffect(() => {
    error && toast.error('Something went wrong...')
  }, [error])

  if (isLoading) {
    return <div>Loading...</div>
  }

  const getSearchName = (value: string) => {
    dispatch(setSearchName(value))
  }

  const changeTasksCountBySelectValue = (value: string) => {
    dispatch(setSelectValue(value))
    localStorage.setItem('selectCount', value)
  }

  const tasksForRender =
    selectValue === 'All tasks' ? sortedTasks : sortedTasks.slice(0, +selectValue)

  return (
    <div className={style.mainWrapper}>
      <Typography>{t('tasksPage.title')}</Typography>
      <div className={style.searchWrapper}>
        <Input
          onValueChange={getSearchName}
          placeholder={t('tasksPage.searchPlaceholder')}
          type={'search'}
          value={searchName}
        />
        <Select
          defaultValue={selectOptions[0].value}
          onValueChange={changeTasksCountBySelectValue}
          placeholder={selectOptions[0].value}
          selectOptions={selectOptions}
          value={selectValue}
        />
      </div>

      <div>{data && <TasksTable tasks={tasksForRender} />}</div>
    </div>
  )
}
