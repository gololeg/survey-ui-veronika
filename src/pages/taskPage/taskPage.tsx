import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { Task } from '@/components/ui'
import { useGetTaskQuery } from '@/services'

export const TaskPage = () => {
  const { id } = useParams()
  const { data, refetch } = useGetTaskQuery({ id })

  useEffect(() => {
    refetch()
  }, [id, refetch])

  return (
    <>
      {data && id && (
        <Task
          answers={data.answers}
          description={data.description}
          id={+id}
          image={data.image}
          isAdmin
          level={data.level}
          name={data.name}
          type={data.type}
        />
      )}
    </>
  )
}
