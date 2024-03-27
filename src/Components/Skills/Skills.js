import React, { useEffect, useState } from 'react';
import { Card, Table, Space, Input, Button } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined
} from '@ant-design/icons';
import axios from './../../Api/axios'
import CreateModal from './CreateModal'

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [open, setOpen] = useState(false);
  const [editSkills, setEditSkills] = useState(null);
  const [q, setQ] = useState('')
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 100,
  });

  const handleCancel = () => {
    setOpen(false)
  }

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/skills?q=${q}&page=${pagination.current}&limit=${pagination.pageSize}`)
      .then(response => {
        setSkills(response.data)
        setPagination({ ...pagination, total: response.data.total_records })
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
      });
  }, [pagination.current, pagination.pageSize, q]);

  const handleTableChange = (pagination, filters, sorter) => {
    setPagination(pagination);
  };

  const handleSearchChange = (e) => {
    const search = e.target.value
    if (search.length >= 2) {
      setQ(search)
    }
    if (search.length === 0) {
      setQ('')
    }
  }


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
            <Input placeholder='Search Skills, Type atleast 2 characters' onChange={handleSearchChange} />
          </div>
          <Button type='primary' onClick={() => { setEditSkills(null); setOpen(true) }} icon={<PlusOutlined />}>Add Skills</Button>
        </div>
      }>
        <Table columns={columns} dataSource={skills} pagination={pagination}
          onChange={handleTableChange} />
      </Card>
    </div>
  )
}

export default Skills
