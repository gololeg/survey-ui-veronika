import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Button } from '@/components/ui'
import { ROUTES } from '@/constants'
import { useAuthMeQuery, useLazyLogoutQuery } from '@/services'

import style from './header.module.scss'

export const Header = () => {
  const { data } = useAuthMeQuery()
  const [logout, { isLoading }] = useLazyLogoutQuery()
  const navigate = useNavigate()

  const onLogoutClick = () => {
    logout()
      .unwrap()
      .then(() => {
        toast.success('Bye-bye!')
        navigate(ROUTES.login)
      })
      .catch(error => {
        toast.error(error.data.message)
      })
  }

  return (
    <div className={style.headerWrapper}>
      <h3 className={style.headerTitle}>
        <Link to={ROUTES.main}>Survey-APP</Link>
      </h3>
      {data ? (
        <Button disabled={isLoading} onClick={onLogoutClick} variant={'secondary'}>
          Sign Out
        </Button>
      ) : (
        <Button variant={'secondary'}>Sign In</Button>
      )}
    </div>
  )
}
