import { ReactNode } from 'react'

import { Typography } from '@/components/ui'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import * as Label from '@radix-ui/react-label'
import * as SelectRadixUI from '@radix-ui/react-select'

import style from './select.module.scss'

export type Options = {
  disabled?: boolean
  label?: string
  value: string
}
type SelectProps = {
  className?: string
  defaultValue?: string
  disabled?: boolean
  label?: string
  onValueChange?: (value: string) => void
  placeholder?: ReactNode
  selectOptions: Options[]
  value?: string
}
export const Select = ({
  className,
  defaultValue,
  disabled,
  label,
  onValueChange,
  placeholder,
  selectOptions,
  value,
}: SelectProps) => {
  return (
    <Label.Root>
      <Typography
        as={'label'}
        className={`${style.label} ${disabled && style.labelDisabled}`}
        variant={'body2'}
      >
        {label}
      </Typography>
      <SelectRadixUI.Root
        defaultValue={defaultValue}
        disabled={disabled}
        onValueChange={onValueChange}
        required
        value={value}
      >
        <SelectRadixUI.Trigger className={`${style.trigger} ${className}`}>
          <SelectRadixUI.Value placeholder={placeholder} />
          <ChevronDownIcon className={style.icon} />
        </SelectRadixUI.Trigger>

        <SelectRadixUI.Portal>
          <SelectRadixUI.Content className={style.content} position={'popper'} sideOffset={-1}>
            <SelectRadixUI.Viewport>
              {selectOptions.map(option => {
                return (
                  <SelectRadixUI.Item
                    className={style.item}
                    disabled={option.disabled}
                    key={option.value}
                    value={option.value}
                  >
                    <SelectRadixUI.ItemText>{option.value}</SelectRadixUI.ItemText>
                  </SelectRadixUI.Item>
                )
              })}
            </SelectRadixUI.Viewport>
          </SelectRadixUI.Content>
        </SelectRadixUI.Portal>
      </SelectRadixUI.Root>
    </Label.Root>
  )
}
