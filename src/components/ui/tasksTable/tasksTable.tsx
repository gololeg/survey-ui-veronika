import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import {
  Column,
  Sort,
  Table,
  TableBody,
  TableData,
  TableHeader,
  TableRow,
  Typography,
} from '@/components/ui'
import { GetTaskRequestType, useAppDispatch } from '@/services'
import { sortTasks } from '@/services/slices'
import { RiEdit2Line } from 'react-icons/ri'

import style from './tasksTable.module.scss'

type PropsType = {
  tasks: GetTaskRequestType[]
}

export const TasksTable = ({ tasks }: PropsType) => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const [sort, setSort] = useState<Sort>({ direction: '', key: '' })
  const onSetSort = (sort: Sort) => {
    setSort(sort)
    dispatch(sortTasks(sort || { direction: '', key: '' }))
  }
  const columns: Column[] = [
    {
      key: 'number',
      sortable: false,
      title: 'N',
    },
    {
      key: 'name',
      title: t('tasksPage.table.name'),
    },
    {
      key: 'description',
      sortable: false,
      title: t('tasksPage.table.description'),
    },
    {
      key: 'type',
      title: t('tasksPage.table.type'),
    },
    {
      key: 'level',
      title: t('tasksPage.table.level'),
    },
    {
      key: 'action',
      sortable: false,
      title: t('tasksPage.table.action'),
    },
  ]

  return (
    <>
      <Table>
        <TableHeader columns={columns} onSort={onSetSort} sort={sort} />
        <TableBody>
          {tasks.map((task, index) => {
            return (
              <TableRow key={task.id}>
                <TableData style={{ width: '10%' }}>
                  <Typography as={'span'} variant={'body2'}>
                    {index + 1}
                  </Typography>
                </TableData>
                <TableData style={{ width: '10%' }}>
                  <Typography as={'span'} variant={'body2'}>
                    {task.name}
                  </Typography>
                </TableData>

                <TableData style={{ width: '60%' }}>
                  <Typography as={'p'} variant={'body2'}>
                    {task.description}
                  </Typography>
                </TableData>
                <TableData style={{ width: '10%' }}>
                  <Typography as={'p'} variant={'body2'}>
                    {task.type.name}
                  </Typography>
                </TableData>
                <TableData style={{ width: '10%' }}>
                  <Typography as={'p'} variant={'body2'}>
                    {task.level.name}
                  </Typography>
                </TableData>
                <TableData>
                  <Link to={''}>
                    <RiEdit2Line className={style.editIcon} />
                  </Link>
                </TableData>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </>
  )
}
