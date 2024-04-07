import { useForm } from 'react-hook-form'

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
  const { handleSubmit, register } = useForm<FormValues>()

  const onSubmit = (data: FormValues) => {
    loginHandler(data)
  }

  return (
    <Card title={'Sign In'}>
      <form className={style.formWrapper} onSubmit={handleSubmit(onSubmit)}>
        <Input id={'login'} label={'Login'} placeholder={''} {...register('login')} />
        <Input
          id={'password'}
          label={'Password'}
          placeholder={''}
          type={'password'}
          {...register('password')}
        />
        <Button disabled={disabled} type={'submit'} variant={'primary'}>
          Sign In
        </Button>
      </form>
    </Card>
  )
}
