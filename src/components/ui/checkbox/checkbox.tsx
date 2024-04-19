import { ComponentPropsWithoutRef } from 'react'

import * as Checkbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'

import style from './checkbox.module.scss'

export type CheckboxProps = {
  checked?: boolean
  className?: string
  disabled?: boolean
  label?: string
  onCheckedHandler?: (checked: boolean) => void
} & ComponentPropsWithoutRef<typeof Checkbox.Root>

export const CheckboxComponent = ({
  checked = false,
  className,
  disabled,
  label,
  onCheckedHandler,
}: CheckboxProps) => {
  return (
    <div className={`${style.wrapper} ${className}`}>
      <div className={`${style.checkboxWrapper} ${disabled ? style.disabled : ''}`}>
        <Checkbox.Root
          checked={checked}
          className={style.checkbox}
          disabled={disabled}
          id={'c1'}
          onCheckedChange={onCheckedHandler}
        >
          <Checkbox.Indicator className={style.checkboxIndicator}>
            <CheckIcon className={style.checkIcon} style={{ height: '22px', width: '22px' }} />
          </Checkbox.Indicator>
        </Checkbox.Root>
      </div>
      <label className={style.label} htmlFor={'c1'}>
        {label}
      </label>
    </div>
  )
}
