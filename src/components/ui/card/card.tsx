import { ReactNode } from 'react'

import style from './card.module.scss'

export type CardProps = {
  children: ReactNode
  className?: string
  title?: string
}

export const Card = (props: CardProps) => {
  const { children, className, title } = props

  return (
    <div className={`${style.card} ${className}`}>
      <h2 className={style.title}>{title}</h2>
      {children}
    </div>
  )
}
