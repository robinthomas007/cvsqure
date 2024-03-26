import React, { useEffect, useState } from 'react';
import { Card, Table, Space, Input, Button, Avatar } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined
} from '@ant-design/icons';
import axios from './../../Api/axios'
import CreateModal from './CreateModal'
import { useLocation, Link } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [editUsers, setEditUsers] = useState(null);

  const handleCancel = () => {
    setOpen(false)
  }

  useEffect(() => {
    axios.defaults.withCredentials = true
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
      render: (_, record) => {
        return (
          <Space>
            <Avatar src={record.profile.photo_url} />
            <Link to={`/user/${record.id}`}>{record.name}</Link>
          </Space>
        )
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Approved',
      dataIndex: 'approved_flag',
      key: 'approved_flag',
      render: (_, record) => {
        return (
          <div>{record.profile?.approved_flag ? 'true' : 'false'}</div>
        )
      },
    },
    {
      title: 'Approved By',
      dataIndex: 'approved_by',
      key: 'approved_by',
      render: (_, record) => {
        return (
          <div>{record.profile.approved_by}</div>
        )
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {/* <EditOutlined onClick={() => { setOpen(true); setEditUsers(record) }} /> */}
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
