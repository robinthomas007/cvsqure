import React from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { Layout } from 'antd';
import { useAuth } from './../Context/authContext'
import HeaderProfile from './../Components/Header/Header'
import Sidenav from './../Components/Sidebar/Sidenav'
const { Content, Sider, Header } = Layout;

export const AdminRoutes = () => {
  const auth = useAuth()
  const location = useLocation()

  if (auth?.user && auth.user.role !== 'admin') {
    return <Navigate to="/" state={{ path: location.pathname }} />
  }

  return (
    <Layout className='min-h-fit'>
      <Layout style={{ background: '#fff', minHeight: 915 }}>
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
