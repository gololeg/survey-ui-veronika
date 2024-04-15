import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'

import { ROUTES } from '@/constants'
import { BsPersonPlus } from 'react-icons/bs'
import { IoPeopleOutline } from 'react-icons/io5'
import { IoSettingsOutline } from 'react-icons/io5'
import { MdOutlineTaskAlt } from 'react-icons/md'
import { MdOutlineAddTask } from 'react-icons/md'

import style from './navbar.module.scss'

export const Navbar = () => {
  const { t } = useTranslation()

  return (
    <nav>
      <ul className={style.navbarWrapper}>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? style.active : style.nav)}
            to={ROUTES.tasks}
          >
            <MdOutlineTaskAlt />
            {t('navbar.allTasks')}
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? style.active : style.nav)}
            to={ROUTES.createTask}
          >
            <MdOutlineAddTask />
            {t('navbar.create')}
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? style.active : style.nav)}
            to={ROUTES.allAccesses}
          >
            <IoPeopleOutline />
            {t('navbar.allAccesses')}
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? style.active : style.nav)}
            to={ROUTES.createAccess}
          >
            <BsPersonPlus />
            {t('navbar.createAccess')}
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? style.active : style.nav)}
            to={ROUTES.settings}
          >
            <IoSettingsOutline />
            {t('navbar.settings')}
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}
