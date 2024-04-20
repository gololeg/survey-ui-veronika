import { CreateTaskRequest, GetTaskRequestType, baseApi } from '@/services'

const tasksApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      createTask: builder.mutation<GetTaskRequestType, CreateTaskRequest>({
        invalidatesTags: ['Task'],
        query: args => {
          return { body: args, method: 'POST', url: `v1/tasks` }
        },
      }),
      getTasks: builder.query<GetTaskRequestType[], void>({
        providesTags: ['Task'],
        query: () => `v1/tasks`,
      }),
    }
  },
})

export const { useCreateTaskMutation, useGetTasksQuery } = tasksApi
