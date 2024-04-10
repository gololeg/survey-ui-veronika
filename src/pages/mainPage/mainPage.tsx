import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import {
  Input,
  Table,
  TableBody,
  TableData,
  TableHeader,
  TableRow,
  Typography,
} from '@/components/ui'
import { useGetTasksQuery } from '@/services'
import { RiEdit2Line } from 'react-icons/ri'

import style from './mainPage.module.scss'

type Column = {
  key: string
  sortable?: boolean
  title: 'CHECKBOX' | 'HIGH' | 'LOW' | 'MIDDLE' | 'RADIO' | string
}

export const MainPage = () => {
  const { t } = useTranslation()
  const { data, error, isLoading } = useGetTasksQuery()

  const columns: Column[] = [
    {
      key: 'number',
      title: 'N',
    },
    {
      key: 'name',
      title: t('mainPage.table.name'),
    },
    {
      key: 'description',
      sortable: false,
      title: t('mainPage.table.description'),
    },
    {
      key: 'type',
      sortable: false,
      title: t('mainPage.table.type'),
    },
    {
      key: 'level',
      sortable: false,
      title: t('mainPage.table.level'),
    },
    {
      key: 'action',
      sortable: false,
      title: t('mainPage.table.action'),
    },
  ]

  useEffect(() => {
    error && toast.error('Something went wrong...')
  }, [error])
  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className={style.mainWrapper}>
      <Typography>{t('mainPage.title')}</Typography>
      <Input type={'search'} />

      <div>
        {data && (
          <Table>
            <TableHeader className={style.tHeader} columns={columns} />
            <TableBody>
              {data.map((task, index) => {
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
        )}
      </div>
    </div>
  )
}
