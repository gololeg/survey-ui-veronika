export type LoginRequestType = {
  login: string
  password: string
}

export type GetTaskRequestType = {
  answers: []
  ars: null
  description: string
  file: null
  id: number
  image: string
  imageStr: string
  level: {
    id: number
    name: 'HIGH' | 'LOW' | 'MIDDLE'
  }
  name: string
  nextTaskId: number
  strAnswers: null
  type: {
    id: number
    name: 'CHECKBOX' | 'RADIO'
  }
}
