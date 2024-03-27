import React from 'react'
import {
  AppstoreOutlined,
  UserOutlined,
  UsergroupAddOutlined,
  FilePdfOutlined,
  BarsOutlined
} from '@ant-design/icons';
import { Menu } from 'antd';
import { useLocation, Link } from 'react-router-dom';
import Logo from './../../Images/logo.svg'
import Sedin from './../../Images/sedin.svg'
import { useAuth } from './../../Context/authContext'

const Sidenav = () => {
  const location = useLocation();
  const auth = useAuth()

  const adminNavigation = [
    { label: "Dashboard", href: '/', icon: <AppstoreOutlined />, key: '/' },
    { label: "User List", href: '/users', icon: <UsergroupAddOutlined />, key: '/users' },
    // { label: "Templates", href: '/template', icon: <FilePdfOutlined />, key: '/template' },
    { label: "Skills", href: '/skills', icon: <BarsOutlined />, key: '/skills' },
  ]

  const userNavigation = [
    { label: "Dashboard", href: '/', icon: <AppstoreOutlined />, key: '/' },
    { label: "Personal Info", href: '/profile', icon: <UserOutlined />, key: '/profile' },
  ]

  const filteredNavigation = auth.user.role === 'admin' ? adminNavigation : userNavigation;

  const getSelectedKey = (pathname) => {
    if (pathname.startsWith('/users') || pathname.startsWith('/user')) {
      return '/users';
    }
    return pathname;
  };


  return (
    <div className='p-0'>
      <div className='flex items-center bg-white py-4 px-4 border'>
        <img width={200} alt='img' className='ml-6 mt-1' src="https://railsfactory.com/assets/images/Ruby-on-Rails-Development-Company.png" />
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[getSelectedKey(location.pathname)]}
        className='my-10'
        style={{ margin: '20px auto' }}
      >
        {filteredNavigation.map(({ label, href, icon, key }) => (
          <Menu.Item key={key} icon={icon} >
            <Link to={href}>{label}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </div>
  )
}

export default Sidenav
