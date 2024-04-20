import { ChangeEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'

export const useAddTaskImage = () => {
  const { t } = useTranslation()
  const [coverPreview, setCoverPreview] = useState('')
  const [coverError, setCoverError] = useState('')
  const [base64, setBase64] = useState('')

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    const allowedTypes = ['image/jpeg', 'image/png']

    if (!allowedTypes.includes(file.type)) {
      setCoverError(t('createTaskPage.mistakes.imageFormat'))

      return
    }
    const maxSizeInBytes = 1024 * 1024

    if (file.size > maxSizeInBytes) {
      setCoverError(t('createTaskPage.mistakes.imageSize'))

      return
    }

    setCoverPreview(URL.createObjectURL(file))
    setCoverError('')

    const reader = new FileReader()

    reader.readAsDataURL(file)
    reader.onload = () => {
      const base64String = reader.result?.toString().split(',')[1]

      base64String && setBase64(base64String)
    }
  }

  const previewFileRemove = () => {
    setCoverPreview('')
    setBase64('')
  }

  return { base64, coverError, coverPreview, handleImageChange, previewFileRemove }
}
