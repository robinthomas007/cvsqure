import React, { useState } from 'react'
import { Avatar, Space, Popover } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { clearCookie } from './../../Lib/auth'
import { useAuth } from './../../Context/authContext'

export default function HeaderProfile() {
  const [open, setOpen] = useState(false);

  const auth = useAuth()

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const ProfileContent = (
    <div style={{ cursor: 'pointer' }}>
      <hr />
      <p onClick={() => clearCookie()}>Logout</p>
    </div>
  );

  return (
    <div className="p-4 border shadow-lg">
      <div className='flex items-center  justify-between'>
        {/* <img width={200} alt='img' className='ml-24' src="https://railsfactory.com/assets/images/Ruby-on-Rails-Development-Company.png" /> */}
        <div></div>
        <div className=''>
          <Popover
            content={ProfileContent}
            title={auth.user.email}
            trigger="click"
            open={open}
            onOpenChange={handleOpenChange}
            style={{ border: '1px solid red' }}
            overlayStyle={{ marginRight: '210px', color: 'red' }}
            rootClassName="profile-menu"
          >
            <img width={50} alt='img' className='mr-10 rounded-full' src={auth.user.picture} />
          </Popover>
        </div>
      </div>
    </div >
  )
}
