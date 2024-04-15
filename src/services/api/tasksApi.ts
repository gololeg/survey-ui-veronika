import { GetTaskRequestType, baseApi } from '@/services'

const tasksApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getTasks: builder.query<GetTaskRequestType[], void>({
        query: () => `v1/tasks`,
      }),
    }
  },
})

export const { useGetTasksQuery } = tasksApi
