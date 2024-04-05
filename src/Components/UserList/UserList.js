import React, { useEffect, useState } from 'react';
import { Card, Table, Space, Input, Button, Avatar } from 'antd';
import {
  PlusCircleOutlined
} from '@ant-design/icons';
import axios from './../../Api/axios'
import { Link } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [q, setQ] = useState('')
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 100,
  });


  useEffect(() => {
    axios.defaults.withCredentials = true
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/admin/users?q=${q}&page=${pagination.current}&limit=${pagination.pageSize}`)
      .then(response => {
        setUsers(response.data.users)
        setPagination({ ...pagination, total: response.data.total_records })
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
      });
  }, [pagination.current, pagination.pageSize, q]);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => {
        return (
          <Space>
            <Avatar src={record.profile?.personal_details?.photo_url} />
            <Link to={`/admin/user/${record.id}`}>{record.name}</Link>
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
      title: 'Phone Number',
      dataIndex: 'phone_number',
      key: 'phone_number',
      render: (_, record) => {
        return record.profile?.personal_details?.phone_number
      },
    },
    {
      title: 'Employee Number',
      dataIndex: 'employee_number',
      key: 'employee_number',
      render: (_, record) => {
        return record.profile?.personal_details?.employee_number
      },
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
    // {
    //   title: 'Action',
    //   key: 'action',
    //   render: (_, record) => (
    //     <Space size="middle">
    //       {/* <DeleteOutlined /> */}
    //     </Space>
    //   ),
    // },
  ]

  const handleTableChange = (pagination, filters, sorter) => {
    setPagination(pagination);
  };

  const handleSearchChange = (e) => {
    const search = e.target.value
    if (search.length >= 3) {
      setQ(search)
    }
    if (search.length === 0) {
      setQ('')
    }
  }

  return (
    <div className='mt-2'>
      <div className='flex justify-between mb-2 items-center bg-white shadow py-3 px-4 rounded-md'>
        <div>
          <label className='text-xl font-semibold'>Employee list</label>
        </div>
        <div>
          <Input className='table-input-search mr-2' size='small' placeholder='Search Users, Type atleast 3 characters' onChange={handleSearchChange} />
          <Button icon={<PlusCircleOutlined />} type='primary'>Add User</Button>
        </div>
      </div>
      <Card>
        <Table columns={columns} dataSource={users} pagination={pagination}
          onChange={handleTableChange} />
      </Card>
    </div>
  )
}

export default UserList
