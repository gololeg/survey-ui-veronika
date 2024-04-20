import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { Layout } from '@/components/layout'
import { ROUTES } from '@/constants'
import { CreateTaskPage, ErrorPage, SignInPage, TasksPage } from '@/pages'
import { useAuthMeQuery } from '@/services'

const publicRoutes: RouteObject[] = [
  {
    element: <SignInPage />,
    path: ROUTES.login,
  },
]

const privateRoutes: RouteObject[] = [
  {
    element: <TasksPage />,
    path: ROUTES.tasks,
  },
  {
    element: <CreateTaskPage />,
    path: ROUTES.createTask,
  },
]

const router = createBrowserRouter([
  {
    children: [
      ...publicRoutes,
      { children: privateRoutes, element: <PrivateRoutes /> },
      {
        element: <ErrorPage />,
        path: ROUTES.error,
      },
    ],
    element: <Layout />,
  },
])

function PrivateRoutes() {
  const { data, isLoading } = useAuthMeQuery()

  if (isLoading) {
    return <div>Loading... </div>
  }
  const isLoggedIn = !!data

  return isLoggedIn ? <Outlet /> : <Navigate to={ROUTES.login} />
}

export const Router = () => {
  return <RouterProvider router={router} />
}
