import React from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { Layout } from 'antd';
import { useAuth } from './../Context/authContext'
import HeaderProfile from './../Components/Header/Header'
import Sidenav from './../Components/Sidebar/Sidenav'
const { Content, Sider, Header } = Layout;

export const PrivateRoutes = () => {
  const auth = useAuth()
  const location = useLocation()

  if (auth?.user && !auth.user.exp) {
    return <Navigate to="/login" state={{ path: location.pathname }} />
  }

  if (auth?.user && auth.user.role === 'admin') {
    return <Navigate to="/admin" state={{ path: location.pathname }} />
  }

  return (
    <Layout className='min-h-fit user-layout'>
      <Header className='bg-teal-700 m-2' style={{ padding: 0, background: '#168D7F', borderRadius: 8 }}>
        <HeaderProfile />
      </Header>
      <Layout style={{ background: '#f5f5f5', minHeight: 915 }}>
        <Sider className='shadow-lg m-2 rounded-md' width={240} theme='light'>
          <Sidenav />
        </Sider>
        <Content className='mr-2'>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
