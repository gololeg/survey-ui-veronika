import { Button } from '@/components/ui'

import style from './mainPage.module.scss'

export const MainPage = () => {
  return (
    <div className={style.mainWrapper}>
      <div>There are some js-tasks for you.</div>
      <div>Are you ready to start?</div>
      <Button>GO!</Button>
    </div>
  )
}
