import React from 'react'
import {
  AppstoreOutlined,
  UserOutlined,
  UsergroupAddOutlined,
  BarsOutlined
} from '@ant-design/icons';
import { Menu } from 'antd';
import { useLocation, Link } from 'react-router-dom';
import { useAuth } from './../../Context/authContext'

const Sidenav = () => {
  const location = useLocation();
  const auth = useAuth()

  const adminNavigation = [
    { label: "Dashboard", href: '/admin', icon: <AppstoreOutlined />, key: '/admin' },
    { label: "User List", href: '/admin/users', icon: <UsergroupAddOutlined />, key: '/admin/users' },
    { label: "Skills", href: '/admin/skills', icon: <BarsOutlined />, key: '/admin/skills' },
  ]

  const userNavigation = [
    { label: "Dashboard", href: '/', icon: <AppstoreOutlined />, key: '/' },
    { label: "Personal Info", href: '/profile', icon: <UserOutlined />, key: '/profile' },
  ]

  const filteredNavigation = auth.user.role === 'admin' ? adminNavigation : userNavigation;

  const getSelectedKey = (pathname) => {
    if (pathname.startsWith('/admin/users') || pathname.startsWith('/admin/user')) {
      return '/admin/users';
    }
    return pathname;
  };


  return (
    <div className='p-1'>
      <Menu
        mode="inline"
        selectedKeys={[getSelectedKey(location.pathname)]}
        className='my-10 text-white cv-menu-left'
        style={{ margin: '20px auto', border: 'none' }}
      >
        {filteredNavigation.map(({ label, href, icon, key }) => (
          <Menu.Item key={key} icon={icon} className='rounded-lg' >
            <Link to={href} className='text-lg'>{label}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </div>
  )
}

export default Sidenav
