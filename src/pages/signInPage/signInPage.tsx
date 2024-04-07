import { Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { SignIn } from '@/components/auth'
import { ROUTES } from '@/constants'
import { LoginRequestType, useAuthMeQuery, useLoginMutation } from '@/services'

export const SignInPage = () => {
  const { data } = useAuthMeQuery()
  const [login, { isLoading }] = useLoginMutation()
  const navigate = useNavigate()
  const sendLoginData = (data: LoginRequestType) => {
    login(data)
      .unwrap()
      .then(() => {
        toast.success('Hello')
        navigate(ROUTES.main)
      })
      .catch(error => {
        toast.error(error.data.message)
      })
  }

  if (data) {
    return <Navigate to={ROUTES.main} />
  }

  return <SignIn disabled={isLoading} loginHandler={sendLoginData} />
}
