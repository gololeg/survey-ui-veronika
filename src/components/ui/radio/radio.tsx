import { Typography } from '@/components/ui'
import * as RadioGroup from '@radix-ui/react-radio-group'

import style from './radio.module.scss'

type RadioProps = {
  className?: string
  defaultValue?: string
  isDisabled?: boolean
  onChangeOption?: (option: any) => void
  options?: { id: any; value: any }[]
  value?: string
}

export const Radio = ({
  className,
  defaultValue,
  isDisabled = false,
  onChangeOption,
  options,
  value,
}: RadioProps) => {
  return (
    <>
      <RadioGroup.Root
        className={`${style.root} ${className}`}
        defaultValue={defaultValue}
        onValueChange={onChangeOption}
        value={value}
      >
        {options?.map(o => {
          return (
            <div className={style.itemGroup} key={o.id}>
              <div className={`${style.itemWrapper} ${isDisabled ? style.disabled : ''}`}>
                <RadioGroup.Item
                  className={style.item}
                  disabled={isDisabled}
                  id={o.id}
                  value={o.value}
                >
                  <RadioGroup.Indicator className={style.indicator} />
                </RadioGroup.Item>
              </div>
              <label
                className={`${style.label} ${isDisabled ? style.labelDisabled : ''}`}
                htmlFor={o.id}
              >
                <Typography as={'h4'} className={style.labelText} variant={'body2'}>
                  {o.value}
                </Typography>
              </label>
            </div>
          )
        })}
      </RadioGroup.Root>
    </>
  )
}
