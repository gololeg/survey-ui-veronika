export type LoginRequestType = {
  login: string
  password: string
}

export type Answer = {
  id: number
  name: string
  right: boolean
  text: string
  value: string
}

export type GetTaskRequestType = {
  active: boolean
  answers: Answer[]
  description: string
  id: number
  image: string
  level: {
    id: number
    name: 'HIGH' | 'LOW' | 'MIDDLE' | string
  }
  name: string
  type: {
    id: number
    name: 'CHECKBOX' | 'RADIO' | string
  }
}

export type UpdateTaskRequest = Partial<GetTaskRequestType>

export type CreateTaskRequest = Pick<
  GetTaskRequestType,
  'description' | 'image' | 'level' | 'name' | 'type'
> & {
  answers: Array<Pick<Answer, 'right' | 'text'>>
}
