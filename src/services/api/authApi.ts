import { LoginRequestType, baseApi } from '@/services'

const authApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      authMe: builder.query<boolean, void>({
        query: () => `v1/auth/me`,
      }),
      login: builder.mutation<boolean, LoginRequestType>({
        query: ({ ...args }) => {
          return { body: { ...args }, method: 'POST', url: `v1/login` }
        },
      }),
      logout: builder.query<boolean, void>({
        query: () => `v1/logout`,
      }),
    }
  },
})

export const { useAuthMeQuery, useLazyLogoutQuery, useLoginMutation } = authApi
