import React, { useEffect, useState } from 'react';
import { Card, Table, Space, Input, Button } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined
} from '@ant-design/icons';
import axios from 'axios'
import CreateModal from './CreateModal'

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [editUsers, setEditUsers] = useState(null);

  const handleCancel = () => {
    setOpen(false)
  }

  useEffect(() => {
    axios.get(`http://localhost:8080/api/admin/users`)
      .then(response => {
        setUsers(response.data.users)
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
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'Role',
      key: 'Role',
    },
    {
      title: 'Approved',
      dataIndex: 'ApprovedFlag',
      key: 'ApprovedFlag',
      render: (_, record) => {
        console.log(record.Profile.ApprovedFlag, "record")
        return (
          <div>{record.Profile?.ApprovedFlag ? 'true' : 'false'}</div>
        )
      },
    },
    {
      title: 'Approved By',
      dataIndex: 'ApprovedBy',
      key: 'ApprovedBy',
      render: (_, record) => {
        return (
          <div>{record.Profile.ApprovedBy}</div>
        )
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <EditOutlined onClick={() => { setOpen(true); setEditUsers(record) }} />
          <DeleteOutlined />
        </Space>
      ),
    },
  ]

  return (
    <div>
      {/* {open && <CreateModal open={open} handleCancel={handleCancel} users={editUsers} />} */}
      <Card title={
        <div className='flex justify-between'>
          <div style={{ width: 300 }}>
            <Input placeholder='Search Users' />
          </div>
          {/* <Button type='primary' onClick={() => { setEditUsers(null); setOpen(true) }} icon={<PlusOutlined />}>Add User</Button> */}
        </div>
      }>
        <Table columns={columns} dataSource={users} />
      </Card>
    </div>
  )
}

export default UserList
