import { Outlet } from 'react-router-dom'

import { Header, Navbar } from '@/components/ui'
import { useAuthMeQuery } from '@/services'

import style from './layout.module.scss'

export const Layout = () => {
  const { data } = useAuthMeQuery()

  return (
    <>
      <Header />
      <div className={style.layout}>
        {data && (
          <div className={style.navbar}>
            <Navbar />
          </div>
        )}
        <div className={style.content}>
          <Outlet />
        </div>
      </div>
    </>
  )
}
