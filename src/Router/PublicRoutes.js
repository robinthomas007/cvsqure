import React from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { Layout } from 'antd';
import { useAuth } from './../Context/authContext'

const { Content } = Layout;

export const PublicRoutes = () => {
  const auth = useAuth()
  const location = useLocation()
  if (auth?.user && auth.user.perm) {
    return <Navigate to="/" state={{ path: location.pathname }} />
  }
  return (
    <Layout>
      <Layout style={{ background: '#fff' }} className='h-screen'>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
