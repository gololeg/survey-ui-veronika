import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Button, Card, Input } from '@/components/ui'

import style from './signIn.module.scss'

type FormValues = {
  login: string
  password: string
}

type SignInProps = {
  disabled: boolean
  loginHandler: (data: FormValues) => void
}

export const SignIn = ({ disabled, loginHandler }: SignInProps) => {
  const { t } = useTranslation()
  const { handleSubmit, register } = useForm<FormValues>()

  const onSubmit = (data: FormValues) => {
    loginHandler(data)
  }

  return (
    <Card title={t('login.signIn')}>
      <form className={style.formWrapper} onSubmit={handleSubmit(onSubmit)}>
        <Input id={'login'} label={t('login.login')} placeholder={''} {...register('login')} />
        <Input
          id={'password'}
          label={t('login.password')}
          placeholder={''}
          type={'password'}
          {...register('password')}
        />
        <Button disabled={disabled} type={'submit'} variant={'primary'}>
          {t('login.signIn')}
        </Button>
      </form>
    </Card>
  )
}
