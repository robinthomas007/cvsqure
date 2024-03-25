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

  const navigation = [
    { label: "Dashboard", href: '/', icon: <AppstoreOutlined />, key: '/', role: 'user' },
    { label: "Personal Info", href: '/profile', icon: <UserOutlined />, key: '/profile', role: 'user' },
    { label: "User List", href: '/users', icon: <UsergroupAddOutlined />, key: '/users', role: 'admin' },
    { label: "Templates", href: '/template', icon: <FilePdfOutlined />, key: '/template', role: 'admin' },
    { label: "Skills", href: '/skills', icon: <BarsOutlined />, key: '/skills', role: 'admin' },
  ]

  const filteredNavigation = auth.user.role !== 'admin' ? navigation.filter((nav) => nav.role === 'user') : navigation;

  return (
    <div className='p-0'>
      <div className='flex items-center bg-white py-4 px-4 border'>
        <img width={200} alt='img' className='ml-6 mt-1' src="https://railsfactory.com/assets/images/Ruby-on-Rails-Development-Company.png" />
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
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
