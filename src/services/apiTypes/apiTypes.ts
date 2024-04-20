export type LoginRequestType = {
  login: string
  password: string
}

export type Answer = {
  id: number
  isRight?: boolean
  name: string
  right?: boolean
  rowTextNum: number
  text: string
  value: string
}

export type GetTaskRequestType = {
  answers: Answer[]
  ars: number[]
  description: string
  file: string
  id: number
  image: string
  imageStr: string
  level: {
    id: number
    name: 'HIGH' | 'LOW' | 'MIDDLE' | string
  }
  name: string
  nextTaskId: number
  strAnswers: string
  type: {
    id: number
    name: 'CHECKBOX' | 'RADIO' | string
  }
}

export type CreateTaskRequest = Pick<
  GetTaskRequestType,
  'description' | 'image' | 'level' | 'name' | 'strAnswers' | 'type'
>
