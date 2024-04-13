import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

import { Button, Input, TasksTable, Typography } from '@/components/ui'
import { useAppDispatch, useAppSelector, useGetTasksQuery } from '@/services'
import { setFilterBySearchName, setSearchName, setTasks } from '@/services/slices'
import { MdOutlineSearch } from 'react-icons/md'

import style from './tasksPage.module.scss'

export const TasksPage = () => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const { data, error, isLoading } = useGetTasksQuery()
  const sortedTasks = useAppSelector(state => state.tasks.sortedTasks)
  const searchName = useAppSelector(state => state.tasks.searchName)

  useEffect(() => {
    data && dispatch(setTasks(data))
  }, [data])

  useEffect(() => {
    error && toast.error('Something went wrong...')
  }, [error])
  if (isLoading) {
    return <div>Loading...</div>
  }

  const getSearchName = (value: string) => {
    dispatch(setSearchName(value))
  }

  const searchByName = () => {
    dispatch(setFilterBySearchName(searchName))
  }

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
        <Button onClick={searchByName}>
          <MdOutlineSearch />
        </Button>
      </div>

      <div>{data && <TasksTable tasks={sortedTasks} />}</div>
    </div>
  )
}
