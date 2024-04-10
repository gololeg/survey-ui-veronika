import { ComponentProps, ComponentPropsWithoutRef } from 'react'

import style from './table.module.scss'

type TableProps = ComponentProps<'table'>
export const Table = ({ className, ...rest }: TableProps) => {
  return <table className={`${style.tableRoot} ${className}`} {...rest}></table>
}

export const TableHead = ({ ...rest }: ComponentProps<'thead'>) => {
  return <thead className={style.tHead} {...rest}></thead>
}

export const TableBody = ({ ...rest }: ComponentProps<'tbody'>) => {
  return <tbody {...rest}></tbody>
}
export const TableRow = ({ ...rest }: ComponentProps<'tr'>) => {
  return <tr className={style.tRow} {...rest}></tr>
}

export const TableData = ({ ...rest }: ComponentProps<'td'>) => {
  return <td className={style.tData} {...rest}></td>
}

export const TableHeaderData = ({ ...rest }: ComponentProps<'th'>) => {
  return <th className={style.thData} {...rest}></th>
}

export type Column = {
  key: string
  sortable?: boolean
  title: string
}

export type Sort = {
  direction: 'asc' | 'desc'
  key: string
} | null

export const TableHeader = ({
  columns,
  onSort,
  sort,
  ...restProps
}: Omit<
  ComponentPropsWithoutRef<'thead'> & {
    columns: Column[]
    onSort?: (sort: Sort) => void
    sort?: Sort
  },
  'children'
>) => {
  const handleSort = (key: string, sortable?: boolean) => () => {
    if (!onSort || !sortable) {
      return
    }

    if (sort?.key !== key) {
      return onSort({ direction: 'asc', key })
    }

    if (sort.direction === 'desc') {
      return onSort(null)
    }

    return onSort({
      direction: sort?.direction === 'asc' ? 'desc' : 'asc',
      key,
    })
  }

  return (
    <TableHead {...restProps}>
      <TableRow>
        {columns.map(({ key, sortable = true, title }) => (
          <TableHeaderData key={key} onClick={handleSort(key, sortable)}>
            <span className={style.sortTitle}>{title}</span>
          </TableHeaderData>
        ))}
      </TableRow>
    </TableHead>
  )
}
