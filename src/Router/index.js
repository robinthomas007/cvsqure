import React from 'react'
import { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import { PublicRoutes } from './PublicRoutes'
import { PrivateRoutes } from './PrivateRoutes'
import { AdminRoutes } from './AdminRoutes'
import Profile from './../Components/Profile'
import Login from './../Components/Login/Login'
import Dashboard from './../Components/Dashboard/Dashboard'
import UserList from './../Components/UserList/UserList'
import Template from './../Components/Templates/Template'

function Routes() {
  let element = useRoutes([
    {
      element: <AdminRoutes />,
      children: [
        { path: '/users', element: <UserList /> },
        { path: '/template', element: <Template /> },
      ],
    },
    {
      element: <PrivateRoutes />,
      children: [
        { path: '/', element: <Dashboard /> },
        { path: '/profile', element: <Profile /> },
      ],
    },
    {
      element: <PublicRoutes />,
      children: [
        { path: '/login', element: <Login /> },
      ],
    },
  ])
  return element
}

const Router = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes />
    </Suspense>
  )
}

export default Router
