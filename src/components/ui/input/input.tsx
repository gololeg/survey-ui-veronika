import { ChangeEvent, ComponentPropsWithoutRef, KeyboardEvent, forwardRef, useState } from 'react'

import { closeEyeIcon, eyeIcon } from '@/assets'

import s from './input.module.scss'

type InputProps = {
  className?: string
  errorMessage?: string
  label?: string
  onEnter?: () => void
  onValueChange?: (value: string) => void
  placeholder?: string
  value?: string
} & ComponentPropsWithoutRef<'input'>

function getType(type: string, showPassword: boolean) {
  if (type === 'password' && showPassword) {
    return 'text'
  }

  return type
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      errorMessage = '',
      label,
      onEnter,
      onValueChange,
      placeholder,
      type = 'text',
      value,
      ...restProps
    },
    ref
  ) => {
    const isError = errorMessage ? s.error : ''

    const [showPassword, setShowPassword] = useState(false)

    const onChangeValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
      onValueChange?.(e.currentTarget.value)
    }

    const onPressEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      onEnter && e.key === 'Enter' && onEnter()
    }

    return (
      <div className={className}>
        <label className={s.label} htmlFor={restProps.id}>
          {label}
        </label>
        <div className={s.inputWrapper}>
          {type === 'password' && (
            <button
              className={s.inputIcon}
              onClick={() => setShowPassword(!showPassword)}
              type={'button'}
            >
              {showPassword ? (
                <img alt={'InputIcon'} src={eyeIcon} />
              ) : (
                <img alt={''} height={20} src={closeEyeIcon} width={20} />
              )}
            </button>
          )}

          <input
            className={`${isError ? isError : s.default}`}
            onChange={onChangeValueHandler}
            placeholder={placeholder}
            ref={ref}
            type={getType(type, showPassword)}
            value={value}
            {...restProps}
            onKeyDown={onPressEnterHandler}
          />
        </div>
        {errorMessage ? <div className={s.errorMessage}>{errorMessage}</div> : null}
      </div>
    )
  }
)
