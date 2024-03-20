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
    <div className='p-0'>
      <div className='flex items-center bg-white py-4 px-4 border'>
        {/* <img width={35} src={Logo} alt='logo' />
        <img className='ml-4' width={80} src={Sedin} alt='logo' /> */}
        <img width={200} alt='img' className='ml-6 mt-1' src="https://railsfactory.com/assets/images/Ruby-on-Rails-Development-Company.png" />
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
