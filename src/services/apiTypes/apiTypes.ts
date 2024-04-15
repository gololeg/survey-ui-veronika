export type LoginRequestType = {
  login: string
  password: string
}

export type GetTaskRequestType = {
  answers: []
  ars: string
  description: string
  file: string
  id: number
  image: string
  imageStr: string
  level: {
    id: number
    name: 'HIGH' | 'LOW' | 'MIDDLE'
  }
  name: string
  nextTaskId: number
  strAnswers: string
  type: {
    id: number
    name: 'CHECKBOX' | 'RADIO'
  }
}
