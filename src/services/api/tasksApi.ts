import { CreateTaskRequest, GetTaskRequestType, UpdateTaskRequest, baseApi } from '@/services'

const tasksApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      changeTaskStatus: builder.mutation<GetTaskRequestType, { id: number }>({
        invalidatesTags: ['Task'],
        query: ({ id }) => {
          return { method: 'PATCH', url: `v1/tasks/${id}/active` }
        },
      }),
      createTask: builder.mutation<GetTaskRequestType, CreateTaskRequest>({
        invalidatesTags: ['Task'],
        query: args => {
          return { body: args, method: 'POST', url: `v1/tasks` }
        },
      }),
      getTask: builder.query<GetTaskRequestType, { id?: string }>({
        query: ({ id }) => {
          return { method: 'GET', url: `v1/tasks/${id}` }
        },
      }),
      getTasks: builder.query<GetTaskRequestType[], void>({
        providesTags: ['Task'],
        query: () => `v1/tasks`,
      }),
      updateTask: builder.mutation<GetTaskRequestType, UpdateTaskRequest>({
        invalidatesTags: ['Task'],
        query: args => {
          return { body: args, method: 'PUT', url: `v1/tasks` }
        },
      }),
    }
  },
})

export const {
  useChangeTaskStatusMutation,
  useCreateTaskMutation,
  useGetTaskQuery,
  useGetTasksQuery,
  useUpdateTaskMutation,
} = tasksApi
