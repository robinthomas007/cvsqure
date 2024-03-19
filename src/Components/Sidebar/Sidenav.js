import React from 'react'
import {
  AppstoreOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import { useLocation, Link } from 'react-router-dom';
import Logo from './../../Images/logo.svg'
import Sedin from './../../Images/sedin.svg'

const Sidenav = () => {
  const location = useLocation();
  const navigation = [
    { label: "Dashboard", href: '/', icon: <AppstoreOutlined />, key: '/' },
    { label: "Personal Info", href: '/profile', icon: <AppstoreOutlined />, key: '/profile' },
  ]
  return (
    <div className='p-1'>
      <div className='flex items-center bg-white p-4'>
        <img width={35} src={Logo} alt='logo' />
        <img className='ml-4' width={80} src={Sedin} alt='logo' />
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        className='my-10'
        style={{ margin: '20px auto' }}
      >
        {navigation.map(({ label, href, icon, key }) => (
          <Menu.Item key={key} icon={icon} >
            <Link to={href}>{label}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </div>
  )
}

export default Sidenav
