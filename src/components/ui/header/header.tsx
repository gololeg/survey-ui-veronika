import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { ChangeLanguage } from '@/components/changeLanguage'
import { Button } from '@/components/ui'
import { ROUTES } from '@/constants'
import { useAuthMeQuery, useLazyLogoutQuery } from '@/services'

import style from './header.module.scss'

export const Header = () => {
  const { t } = useTranslation()
  const { data } = useAuthMeQuery()
  const [logout, { isLoading }] = useLazyLogoutQuery()
  const navigate = useNavigate()
  const bye = t('login.bye')

  const onLogoutClick = () => {
    logout()
      .unwrap()
      .then(() => {
        toast.success(bye)
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
      <div className={style.buttonsWrapper}>
        <ChangeLanguage />
        {data ? (
          <Button disabled={isLoading} onClick={onLogoutClick} variant={'secondary'}>
            {t('login.signOut')}
          </Button>
        ) : (
          <Button variant={'secondary'}>{t('login.signIn')}</Button>
        )}
      </div>
    </div>
  )
}
