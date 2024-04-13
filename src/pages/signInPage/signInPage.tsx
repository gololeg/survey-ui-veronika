import { useTranslation } from 'react-i18next'
import { Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { SignIn } from '@/components/auth'
import { ROUTES } from '@/constants'
import { LoginRequestType, useAuthMeQuery, useLoginMutation } from '@/services'

export const SignInPage = () => {
  const { t } = useTranslation()
  const { data } = useAuthMeQuery()
  const [login, { isLoading }] = useLoginMutation()
  const navigate = useNavigate()
  const hello = t('login.hello')
  const sendLoginData = (data: LoginRequestType) => {
    login(data)
      .unwrap()
      .then(() => {
        toast.success(hello)
        navigate(ROUTES.tasks)
      })
      .catch(error => {
        toast.error(error.data.message || 'error!')
      })
  }

  if (data) {
    return <Navigate to={ROUTES.tasks} />
  }

  return <SignIn disabled={isLoading} loginHandler={sendLoginData} />
}
