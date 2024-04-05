import React, { useCallback, useEffect, useState } from 'react';
import { Card, Table, Space, Input, Button } from 'antd';
import {
  PlusCircleOutlined,
} from '@ant-design/icons';
import axios from './../../Api/axios'
import CreateModal from './CreateModal'
import { PencilEdit01Icon } from 'hugeicons-react';

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

  const fetchSkills = useCallback(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/skills?q=${q}&page=${pagination.current}&limit=${pagination.pageSize}`)
      .then(response => {
        setSkills(response.data.skills)
        setPagination({ ...pagination, total: response.data.total_records })
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
      });

  }, [pagination.current, pagination.pageSize, q])

  useEffect(() => {
    fetchSkills()
  }, [fetchSkills]);

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
          <PencilEdit01Icon
            size={16}
            color={"#4F4C4C"}
            variant={"stroke"}
            onClick={() => {
              setEditSkills(record);
              setOpen(true)
            }}
          />
          {/* <DeleteOutlined /> */}
        </Space>
      ),
    },
  ]

  return (
    <div className='mt-2'>
      {open && <CreateModal fetchSkills={fetchSkills} open={open} handleCancel={handleCancel} skills={editSkills} />}
      <div className='flex justify-between mb-2 items-center bg-white shadow py-3 px-4 rounded-md'>
        <div>
          <label className='text-xl font-semibold'>Skills list</label>
        </div>
        <div>
          <Input className='table-input-search mr-2' size='small' placeholder='Search Skills, Type atleast 3 characters' onChange={handleSearchChange} />
          <Button icon={<PlusCircleOutlined />} type='primary' onClick={() => { setEditSkills(null); setOpen(true) }}>Add Skills</Button>
        </div>
      </div>

      <Card>
        <Table columns={columns} dataSource={skills} pagination={pagination}
          onChange={handleTableChange} />
      </Card>
    </div>
  )
}

export default Skills
