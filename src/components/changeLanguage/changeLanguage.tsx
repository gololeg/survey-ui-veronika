import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui'

export const ChangeLanguage = () => {
  const { i18n } = useTranslation()

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  return (
    <div style={{ columnGap: 3, display: 'flex' }}>
      <Button onClick={() => changeLanguage('en')}>En</Button>
      <Button onClick={() => changeLanguage('ru')}>Ru</Button>
    </div>
  )
}
