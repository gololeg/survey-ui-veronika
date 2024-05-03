import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import {
  Button,
  Card,
  CheckboxComponent,
  Input,
  InputUploader,
  Select,
  Typography,
} from '@/components/ui'
import { ROUTES, levelOptions, typeOptions } from '@/constants'
import { useAddTaskImage, useCreateAnswerBlock } from '@/hooks'
import { useAppSelector, useCreateTaskMutation } from '@/services'
import { selectAllTasks } from '@/services/selectors'
import { getLevelId, getTypeId } from '@/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import style from './createTaskPage.module.scss'

export const CreateTaskPage = () => {
  const { t } = useTranslation()

  type TaskFormSchema = z.infer<typeof taskSchema>
  const taskSchema = z.object({
    description: z.string().max(100).optional(),
    level: z.string().optional(),
    name: z
      .string()
      .min(1, { message: t('createTaskPage.mistakes.nameContains') })
      .max(100),
    type: z.string().optional(),
  })
  const [createTask, { error, isLoading }] = useCreateTaskMutation()
  const navigate = useNavigate()
  const allTasks = useAppSelector(selectAllTasks)
  const { answersList, handleAddMoreClick, handleAnswerIsRightChange, handleAnswerTextChange } =
    useCreateAnswerBlock()
  const { base64, coverError, coverPreview, handleImageChange, previewFileRemove } =
    useAddTaskImage()

  const [requiredAnswers, setRequiredAnswers] = useState('')
  const [hasDescription, setHasDescription] = useState('')

  const imgSrc = coverPreview || ''

  const hasOneCheckedAnswer = answersList.filter(answer => answer.right).length > 0
  const hasTwoAnswers = answersList.filter(answer => answer.text).length >= 2

  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
    watch,
  } = useForm<TaskFormSchema>({ resolver: zodResolver(taskSchema) })

  const descriptionValue = watch('description')
  const nameValue = watch('name') || ''
  const isNameExist = allTasks.find(
    task => task.name.toLowerCase() === nameValue.trim().toLowerCase()
  )

  const onSubmit: SubmitHandler<TaskFormSchema> = value => {
    if (!base64 && !descriptionValue) {
      setHasDescription(t('createTaskPage.mistakes.description'))
    } else if (!hasOneCheckedAnswer || !hasTwoAnswers) {
      setRequiredAnswers(t('createTaskPage.mistakes.answers'))
    } else {
      const answers = answersList.filter(answer => answer.text)
      const levelId = getLevelId(value.level || '')
      const typeId = getTypeId(value.type || '')

      const data = {
        answers: answers,
        description: value.description || '',
        image: base64,
        level: { id: levelId || levelOptions[1].label, name: value.level || levelOptions[1].value },
        name: value.name,
        type: { id: typeId || typeOptions[1].label, name: value.type || typeOptions[1].value },
      }

      createTask(data)
        .unwrap()
        .then(() => {
          toast.success(t('createTaskPage.successCreated'))
          navigate(ROUTES.tasks)
        })
        .catch(error => {
          toast.error(error.data.message)
        })
    }
  }

  useEffect(() => {
    error && navigate(ROUTES.login)
  }, [error, navigate])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <Card className={style.cardWrapper} title={t('createTaskPage.title')}>
      <div className={style.blockWrapper}>
        <form className={style.formWrapper} onSubmit={handleSubmit(onSubmit)}>
          <Input
            label={t('createTaskPage.form.name')}
            {...register('name')}
            errorMessage={errors.name?.message || (isNameExist && 'This name is exist')}
          />
          <Input
            label={t('createTaskPage.form.description')}
            {...register('description')}
            errorMessage={errors.description?.message}
          />
          <InputUploader
            btnTitle={t('createTaskPage.form.addImgButton')}
            errorMessage={coverError}
            handleFileChange={handleImageChange}
            imageSrc={imgSrc}
            name={'image'}
            previewFileRemove={previewFileRemove}
            register={register}
          />
          {hasDescription && !base64 && !descriptionValue && (
            <div className={style.errorMessage}>{hasDescription}</div>
          )}
          <div className={style.selectWrapper}>
            <Select
              defaultValue={levelOptions[1].value}
              label={t('createTaskPage.form.level')}
              onValueChange={value => setValue('level', value)}
              selectOptions={levelOptions}
              value={watch('level')}
            />
            <Select
              defaultValue={typeOptions[1].value}
              label={t('createTaskPage.form.type')}
              onValueChange={value => setValue('type', value)}
              selectOptions={typeOptions}
              value={watch('type')}
            />
          </div>

          <div className={style.answersWrapper}>
            <Typography as={'h5'} className={style.answersTitle} variant={'h2'}>
              {t('createTaskPage.form.answers')}
            </Typography>
            {answersList.map((answer, index) => {
              const onChecked = (checked: boolean) => {
                handleAnswerIsRightChange(index, checked)
              }

              return (
                <div className={style.answerBlock} key={index}>
                  <Input
                    onChange={e => handleAnswerTextChange(index, e.currentTarget.value)}
                    value={answer.text}
                  />
                  <CheckboxComponent
                    checked={answer.right}
                    label={t('createTaskPage.form.checkboxLabel')}
                    onCheckedHandler={onChecked}
                  />
                </div>
              )
            })}
            <Button
              disabled={!hasTwoAnswers || !hasOneCheckedAnswer}
              onClick={handleAddMoreClick}
              type={'button'}
              variant={'secondary'}
            >
              {t('createTaskPage.form.addAnswerBlock')}
            </Button>
          </div>
          {requiredAnswers && (!hasOneCheckedAnswer || !hasTwoAnswers) && (
            <div className={style.errorMessage}>{requiredAnswers}</div>
          )}
          <Button className={style.submitButton}>
            {t('createTaskPage.form.createTaskButton')}
          </Button>
        </form>
      </div>
    </Card>
  )
}
