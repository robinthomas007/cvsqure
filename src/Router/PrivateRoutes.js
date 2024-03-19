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

  return (
    <Layout>
      <Layout style={{ background: '#fff' }} className='h-screen'>
        <Sider width={300} theme='dark'>
          <Sidenav />
        </Sider>
        <Content>
          <Header className='bg-white' style={{ padding: 0, background: '#fff' }}>
            <HeaderProfile />
          </Header>
          <div className='' style={{ padding: '50px 100px 0px' }}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}
