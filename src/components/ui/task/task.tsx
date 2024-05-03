import { useState } from 'react'

import { Button, Card, CheckboxComponent, EditingTask, Radio, Typography } from '@/components/ui'
import { Answer } from '@/services'
import { getImageFormat } from '@/utils'
import { RiEdit2Line } from 'react-icons/ri'

import style from './task.module.scss'

type TaskProps = {
  answers: Answer[]
  description: string
  id: number
  image: string
  isAdmin?: boolean
  level: { id: number; name: string }
  name: string
  type: { id: number; name: string }
}

export const Task = ({
  answers,
  description,
  id,
  image,
  isAdmin = false,
  level,
  name,
  type,
}: TaskProps) => {
  const [editMode, setEditMode] = useState(false)
  const imageSrc = getImageFormat(image)
  const options = answers.map(a => ({ id: a.id, value: a.text }))
  const rightAnswer = answers.find(a => a.right)
  const defaultRadioValue = rightAnswer ? rightAnswer.text : ''

  return (
    <Card className={style.taskCard}>
      {!editMode ? (
        <>
          {isAdmin && (
            <Typography className={style.taskTitle}>
              {name}&nbsp;
              <Button
                className={style.editButton}
                onClick={() => setEditMode(true)}
                variant={'tertiary'}
              >
                <RiEdit2Line />
              </Button>
            </Typography>
          )}
          <Typography as={'h2'} variant={'h2'}>
            {description}
          </Typography>
          {image && (
            <div>
              <img alt={''} className={style.taskImage} src={imageSrc} />
            </div>
          )}
          <div>
            {type.name.toLowerCase() === 'radio' && (
              <Radio isDisabled={!editMode} options={options} value={defaultRadioValue} />
            )}
            {type.name.toLowerCase() === 'checkbox' &&
              answers.map(answer => (
                <div key={answer.id}>
                  <CheckboxComponent
                    checked={answer.right}
                    disabled={!editMode}
                    label={answer.text}
                  />
                </div>
              ))}
          </div>
        </>
      ) : (
        <EditingTask
          answers={answers}
          description={description}
          id={id}
          imageSrc={image ? imageSrc : ''}
          level={level}
          name={name}
          type={type}
        />
      )}
    </Card>
  )
}
