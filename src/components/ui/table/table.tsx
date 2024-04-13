import { ComponentProps, ComponentPropsWithoutRef } from 'react'

import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
//import { MdKeyboardArrowUp } from 'react-icons/md'
import { RxCaretSort } from 'react-icons/rx'

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
  title: 'CHECKBOX' | 'HIGH' | 'LOW' | 'MIDDLE' | 'RADIO' | string
}

export type Sort = {
  direction: '' | 'asc' | 'desc'
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
      //return onSort(null)
      return onSort({ direction: '', key })
    }

    return onSort({
      direction: sort?.direction === 'asc' ? 'desc' : 'asc',
      key,
    })
  }
  const setArrow = (sort: Sort) => {
    if (sort?.direction === 'asc') {
      return <MdKeyboardArrowUp />
    } else if (sort?.direction === 'desc') {
      return <MdKeyboardArrowDown />
    } else {
      return <RxCaretSort />
    }
  }

  return (
    <TableHead {...restProps}>
      <TableRow>
        {columns.map(({ key, sortable = true, title }) => (
          <TableHeaderData key={key} onClick={handleSort(key, sortable)}>
            <span className={style.sortTitle}>
              {title}
              {sort && sort.key === key && (
                <span className={style.arrows}>
                  {setArrow(sort)}
                  {/*{sort.direction === 'asc' ? (
                    <MdKeyboardArrowUp />
                  ) : sort.direction === 'desc' ? (
                    <MdKeyboardArrowDown />
                  ) : (
                    <RxCaretSort />
                  )}*/}
                </span>
              )}
            </span>
          </TableHeaderData>
        ))}
      </TableRow>
    </TableHead>
  )
}
