import { Card, CheckboxComponent, Radio, Typography } from '@/components/ui'
import { Answer } from '@/services'

import style from './task.module.scss'

type TaskProps = {
  answers: Answer[]
  //answers: Array<Answer & { right: boolean }>
  description: string
  image: string
  imageSrc: string
  isAdmin?: boolean
  name?: string
  type: string
}

export const Task = ({
  answers,
  description,
  image,
  imageSrc,
  isAdmin = false,
  name,
  type,
}: TaskProps) => {
  const title = isAdmin ? name : ''
  const editMode = false

  return (
    <Card className={style.taskCard} title={title}>
      <Typography as={'h2'} variant={'h2'}>
        {description}
      </Typography>
      {image && (
        <div>
          <img alt={''} src={imageSrc} />
        </div>
      )}
      <div>
        {type.toLowerCase() === 'radio' &&
          answers.map(answer => (
            <div className={style.answer} key={answer.id}>
              <Radio isDisabled={!editMode} options={[{ id: answer.id, value: answer.text }]} />
            </div>
          ))}
        {type.toLowerCase() === 'checkbox' &&
          answers.map(answer => (
            <div key={answer.id}>
              <CheckboxComponent disabled={!editMode} label={answer.text} />
            </div>
          ))}
      </div>
    </Card>
  )
}
