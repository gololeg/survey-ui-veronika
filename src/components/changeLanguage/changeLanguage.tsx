import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui'

import style from './changeLanguage.module.scss'

export const ChangeLanguage = () => {
  const { i18n } = useTranslation()

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  return (
    <div className={style.langButtons}>
      <Button onClick={() => changeLanguage('en')}>En</Button>
      <Button onClick={() => changeLanguage('ru')}>Ru</Button>
    </div>
  )
}
