import { useState } from 'react'

export const useCreateAnswerBlock = () => {
  const [answersList, setAnswersList] = useState([
    { right: false, text: '' },
    { right: false, text: '' },
  ])
  const handleAddMoreClick = () => {
    setAnswersList(prevAnswerList => [
      ...prevAnswerList,
      {
        right: false,
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

      updatedAnswerList[index].right = value

      return updatedAnswerList
    })
  }

  return { answersList, handleAddMoreClick, handleAnswerIsRightChange, handleAnswerTextChange }
}
