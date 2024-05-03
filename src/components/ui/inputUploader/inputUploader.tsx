import { ChangeEvent, useState } from 'react'

import { Button, Typography } from '@/components/ui'
import { MdImage } from 'react-icons/md'

import style from './inputUploader.module.scss'

type InputProps = {
  btnTitle: string
  errorMessage?: string
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void
  imageSrc?: null | string
  name: string
  previewFileRemove?: () => void
  register: any
}
export const InputUploader = ({
  btnTitle,
  errorMessage,
  handleFileChange,
  imageSrc,
  name,
  previewFileRemove,
  register,
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <>
      {imageSrc && (
        <div className={style.imagePreviewWrapper}>
          <img alt={'image'} className={style.coverPreview} src={imageSrc} />
          <Button
            className={style.deleteImgButton}
            onClick={previewFileRemove}
            type={'button'}
            variant={'secondary'}
          >
            X
          </Button>
        </div>
      )}
      <div className={`${style.inputFileWrapper} ${isFocused && style.focus}`}>
        <div className={style.changeCover}>
          <MdImage />
          <Typography as={'span'} variant={'subtitle2'}>
            {btnTitle}
          </Typography>
          <input
            type={'file'}
            {...register(name)}
            className={style.inputFile}
            name={name}
            onBlur={() => setIsFocused(false)}
            onChange={handleFileChange}
            onFocus={() => setIsFocused(true)}
          />
        </div>
        {errorMessage ? <div className={style.errorMessage}>{errorMessage}</div> : null}
      </div>
    </>
  )
}
