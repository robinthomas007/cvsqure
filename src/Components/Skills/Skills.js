import React, { useEffect, useState } from 'react';
import { Card, Table, Space, Input, Button } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined
} from '@ant-design/icons';
import axios from 'axios'
import CreateModal from './CreateModal'

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [open, setOpen] = useState(false);
  const [editSkills, setEditSkills] = useState(null);

  const handleCancel = () => {
    setOpen(false)
  }

  useEffect(() => {
    axios.get(`http://localhost:8080/api/skills`)
      .then(response => {
        setSkills(response.data)
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
      });
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <EditOutlined onClick={() => { setOpen(true); setEditSkills(record) }} />
          <DeleteOutlined />
        </Space>
      ),
    },
  ]

  return (
    <div>
      {open && <CreateModal open={open} handleCancel={handleCancel} skills={editSkills} />}
      <Card title={
        <div className='flex justify-between'>
          <div style={{ width: 300 }}>
            <Input placeholder='Search Skills' />
          </div>
          <Button type='primary' onClick={() => { setEditSkills(null); setOpen(true) }} icon={<PlusOutlined />}>Add Skills</Button>
        </div>
      }>
        <Table columns={columns} dataSource={skills} />
      </Card>
    </div>
  )
}

export default Skills
