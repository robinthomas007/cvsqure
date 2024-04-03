import React, { useState } from 'react'
import { Popover } from 'antd';
import cvBuilder from './../../Images/cvBuilder.png'

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
      <p className='my-2'>{auth.user.email}</p>
      <hr />
      <p className='my-2' onClick={() => clearCookie()}>Logout</p>
    </div>
  );

  return (
    <div className="">
      <div className='flex items-center  justify-between'>
        <img width={120} alt='img' className='ml-4' src={cvBuilder} />
        <Popover
          content={ProfileContent}
          title={auth.user.name}
          trigger="click"
          open={open}
          onOpenChange={handleOpenChange}
          style={{ border: '1px solid red' }}
          overlayStyle={{ marginRight: '210px', color: 'red' }}
          rootClassName="profile-menu"
        >
          <div className='flex items-center justify-start mr-10'>
            <img width={40} alt='img' className='mr-4 rounded-full' src={auth.user.picture} />
            <label style={{ fontSize: 16 }} className='font-semibold text-white'>{auth.user.name}</label>
          </div>
        </Popover>
      </div>
    </div >
  )
}
