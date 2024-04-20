import { useState } from 'react'

export const useCreateAnswerBlock = () => {
  const [answersList, setAnswersList] = useState([
    { isRight: false, text: '' },
    { isRight: false, text: '' },
  ])
  const handleAddMoreClick = () => {
    setAnswersList(prevAnswerList => [
      ...prevAnswerList,
      {
        isRight: false,
        text: '',
      },
    ])
  }
  const handleAnswerTextChange = (index: number, value: string) => {
    setAnswersList(prevAnswerList => {
      const updatedAnswerList = [...prevAnswerList]

      updatedAnswerList[index].text = value

      return updatedAnswerList
    })
  }

  const handleAnswerIsRightChange = (index: number, value: any) => {
    setAnswersList(prevAnswerList => {
      const updatedAnswerList = [...prevAnswerList]

      updatedAnswerList[index].isRight = value

      return updatedAnswerList
    })
  }

  return { answersList, handleAddMoreClick, handleAnswerIsRightChange, handleAnswerTextChange }
}
