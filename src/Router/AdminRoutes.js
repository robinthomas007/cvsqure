import React from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { ConfigProvider } from 'antd';
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
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "League Spartan",
          colorPrimary: '#2B648D',
        }
      }}>
      <Layout className='min-h-fit admin-layout'>
        <Header className='bg-cyan-700 m-2' style={{ padding: 0, background: '#2B648D', borderRadius: 8 }}>
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
    </ConfigProvider>
  )
}
