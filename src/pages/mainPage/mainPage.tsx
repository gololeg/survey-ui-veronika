import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui'

import style from './mainPage.module.scss'

export const MainPage = () => {
  const { t } = useTranslation()

  return (
    <div className={style.mainWrapper}>
      <div>{t('mainPage.description')}</div>
      <div>{t('mainPage.ready')}</div>
      <Button>{t('mainPage.go')}</Button>
    </div>
  )
}
