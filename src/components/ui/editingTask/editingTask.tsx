import { ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import {
  Button,
  CheckboxComponent,
  Input,
  InputUploader,
  Select,
  Typography,
} from '@/components/ui'
import { ROUTES, levelOptions, typeOptions } from '@/constants'
import { useAddTaskImage } from '@/hooks'
import { Answer, useAppSelector, useUpdateTaskMutation } from '@/services'
import { selectAllTasks } from '@/services/selectors'

import style from './editingTask.module.scss'

type EditingTaskProps = {
  answers: Answer[]
  description: string
  id: number
  imageSrc: string
  level: { id: number; name: string }
  name: string
  type: { id: number; name: string }
}
export const EditingTask = ({
  answers,
  description,
  id,
  imageSrc,
  level,
  name,
  type,
}: EditingTaskProps) => {
  const { t } = useTranslation()
  const [updateTask] = useUpdateTaskMutation()
  const { base64, coverError, coverPreview, handleImageChange, previewFileRemove } =
    useAddTaskImage()
  const [imgForRender, setImgForRender] = useState(imageSrc)
  const navigate = useNavigate()
  const allTasks = useAppSelector(selectAllTasks)
  const [answersList, setAnswersList] = useState(answers)
  const [nameValue, setNameValue] = useState(name)
  const [descriptionValue, setDescriptionValue] = useState(description)
  const [levelValue, setLevelValue] = useState<string>(level.name)
  const [typeValue, setTypeValue] = useState<string>(type.name)
  const hasEmptyValues =
    !nameValue || !descriptionValue || answersList.filter(a => a.text).length !== answersList.length

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
    const updatedAnswers = [...answersList]
    const updatedAnswer = { ...updatedAnswers[index] }

    updatedAnswer.text = event.currentTarget.value
    updatedAnswers[index] = updatedAnswer
    setAnswersList(updatedAnswers)
  }
  const handleCheckboxChange = (checked: boolean, index: number) => {
    const updatedAnswers = [...answersList]
    const updatedAnswer = { ...updatedAnswers[index] }

    updatedAnswer.right = checked
    updatedAnswers[index] = updatedAnswer
    setAnswersList(updatedAnswers)
  }

  const handleImageRemove = () => {
    previewFileRemove()
    setImgForRender('')
  }

  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
  } = useForm()
  const onSubmit = (value: any) => {
    updateTask({
      answers: answersList,
      description: value.description,
      id,
      image: base64,
      level: { id: level.id, name: levelValue },
      name: value.name,
      type: { id: typeValue === 'RADIO' ? 2 : 1, name: typeValue },
    })
      .unwrap()
      .then(() => {
        toast.success('Your task is successfully updated')
        navigate(ROUTES.tasks)
      })
      .catch(e => {
        toast.error(e.data.message)
      })
  }
  const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const currentName = event.currentTarget.value

    setNameValue(currentName)
    if (allTasks.find(task => task.name.toLowerCase() === currentName) && currentName !== name) {
      setError('name', { message: 'error' })
    } else {
      setError('name', { message: '' })
    }
  }
  const isDisabled = hasEmptyValues || !!errors.name?.message

  return (
    <form className={style.formWrapper} onSubmit={handleSubmit(onSubmit)}>
      <Input
        errorMessage={errors.name?.message ? 'exist' : ''}
        label={t('createTaskPage.form.name')}
        {...register('name')}
        onChange={onNameChange}
        value={nameValue}
      />
      <Input
        label={t('createTaskPage.form.description')}
        {...register('description')}
        onChange={e => setDescriptionValue(e.currentTarget.value)}
        value={descriptionValue}
      />
      <InputUploader
        btnTitle={t('createTaskPage.form.changeImgButton')}
        errorMessage={coverError}
        handleFileChange={handleImageChange}
        imageSrc={coverPreview || imgForRender || ''}
        name={'image'}
        previewFileRemove={handleImageRemove}
        register={register}
      />
      <div className={style.selectsWrapper}>
        <Select
          label={t('createTaskPage.form.level')}
          onValueChange={setLevelValue}
          selectOptions={levelOptions}
          value={levelValue}
        />
        <Select
          label={t('createTaskPage.form.type')}
          onValueChange={setTypeValue}
          selectOptions={typeOptions}
          value={typeValue}
        />
      </div>
      <div className={style.answersWrapper}>
        <Typography as={'h5'} className={style.answersTitle} variant={'h2'}>
          {t('createTaskPage.form.answers')}
        </Typography>
        {answersList.map((answer, index) => {
          const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
            handleInputChange(event, index)
          }
          const checkboxHandler = (checked: boolean) => {
            handleCheckboxChange(checked, index)
          }

          return (
            <div className={style.answer} key={answer.id}>
              <Input onChange={inputHandler} value={answer.text} />
              <CheckboxComponent
                checked={answer.right}
                label={t('createTaskPage.form.checkboxLabel')}
                onCheckedHandler={checkboxHandler}
              />
            </div>
          )
        })}
      </div>
      {hasEmptyValues && <div className={style.errorMessage}>All text fields must be filled</div>}
      <Button disabled={isDisabled}>{t('createTaskPage.form.updateTaskButton')}</Button>
    </form>
  )
}
