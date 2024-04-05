import React, { useEffect, useState } from 'react'
import { Alert, Space, Card } from 'antd';

const Dashboard = () => {

  return (
    <div className="text-center m-4">
      <Alert message="Last updated on 19th Jan 2024" type="success" showIcon className='text-base my-4' />
      <Card className='shadow rounded-md'>
        <div className='flex items-center justify-between text-base'>
          <div className='flex flex-col items-start justify-start'>
            <label>Robin Thomas</label>
            <label>Human resource</label>
          </div>
          <div className='flex flex-col items-end'>
            <label>S1024</label>
            <label>www.imvijayananth.com</label>
          </div>
        </div>
        <hr />
        <div className='flex items-center justify-between text-base'>
          <label>9876545678</label>
          <label>Vijay@gmail.com</label>
        </div>
      </Card>

    </div>

  )
}

export default Dashboard
