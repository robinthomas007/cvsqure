import React from 'react'
import { Avatar, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { clearCookie } from './../../Lib/auth'

export default function HeaderProfile() {
  return (
    <div className="p-4 border-t-4 border-blue-900">
      <div className='flex justify-end items-center mr-24'>
        <img width={200} alt='img' className='mr-10' src="https://railsfactory.com/assets/images/Ruby-on-Rails-Development-Company.png" />
        <Avatar className='ml-10' size="large" icon={<UserOutlined />} />
        <p className='ml-10 font-semibold' onClick={() => clearCookie()}>Logout</p>
      </div>
    </div >
  )
}
