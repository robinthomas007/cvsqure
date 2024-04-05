import React from 'react'
import { Spin } from 'antd';

const Spinner = () => {
  return (
    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
      <Spin size="large" />
    </div>
  )
}

export default Spinner
