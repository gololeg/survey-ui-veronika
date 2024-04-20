import { useParams } from 'react-router-dom'

import { Task } from '@/components/ui'
import { useGetTaskQuery } from '@/services'

export const TaskPage = () => {
  const { id } = useParams()
  const { data } = useGetTaskQuery({ id })

  return (
    <>
      {data && (
        <Task
          answers={data.answers}
          description={data.description}
          image={data.image}
          imageSrc={data.imageStr}
          isAdmin
          name={data.name}
          type={data.type.name}
        />
      )}
    </>
  )
}
