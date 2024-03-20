import React, { useCallback, useState } from 'react';
import { Button, Form, Input, Row, Col, Checkbox, Card, Select } from 'antd';
import { DoubleRightOutlined, DeleteOutlined } from '@ant-design/icons';

const { TextArea } = Input

export default function Project({ current, setCurrent }) {
  const [projects, setProjects] = useState([{}]);

  const handleAddProjects = () => {
    setProjects([...projects, {}]);
  };

  const handleRemoveProjects = (index) => {
    const updatedProejcts = [...projects];
    updatedProejcts.splice(index, 1);
    setProjects(updatedProejcts);
  };

  const onFinish = useCallback((values) => {
    setCurrent(current + 1);
  }, []);

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    setCurrent(current + 1);
  };

  return (
    <Form
      name="job_history_form"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      labelAlign="top"
    >
      <Card className='shadow-2xl' title={<div className='flex justify-between items-center'>
        <div className='font-semibold text-2xl py-6 text-blue-500'>
          Project Experience
        </div>
        <Button type="primary" onClick={handleAddProjects}>
          Add Project Experience
        </Button>
      </div>}>
        {projects.map((job, index) => (
          <Row key={index} gutter={16} className={`p-10 ${index !== projects.length - 1 ? 'border-b-2' : ''}`}>
            <Col span={18}>
              <Row gutter={16} className='items-end'>
                <Col span={12}>
                  <Form.Item
                    name={['project_experience', index, 'name']}
                    label="Project Name"
                    rules={[{ required: true, message: 'Please input Project Name!' }]}
                    labelCol={{ span: 24 }}
                    style={{ marginBottom: 5 }}
                  >
                    <Input placeholder="Project Name" />
                  </Form.Item>
                  <Form.Item
                    name={['project_experience', index, 'tech_stack']}
                    label="Tech Stack"
                    rules={[{ required: true, message: 'Please input Tech Stack!' }]}
                    labelCol={{ span: 24 }}
                    style={{ marginBottom: 5 }}
                  >
                    <Input placeholder="Tech Stack" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name={['project_experience', index, 'roles_responsibilities']}
                    label="Roles & Responsibilities"
                    rules={[{ required: true, message: 'Please input company!' }]}
                    labelCol={{ span: 24 }}
                    style={{ marginBottom: 5 }}
                  >
                    <TextArea placeholder="Company" rows={4} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16} className='items-end'>
                <Col span={6}>
                  <Form.Item
                    name={['project_experience', index, 'start_month']}
                    label="Start Date"
                    rules={[{ required: true, message: 'Please input month!' }]}
                    labelCol={{ span: 24 }}
                    style={{ marginBottom: 5 }}
                  >
                    <Select placeholder='Start month' options={[]} />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name={['project_experience', index, 'start_year']}
                    rules={[{ required: true, message: 'Please input year!' }]}
                    labelCol={{ span: 24 }}
                    style={{ marginBottom: 5 }}
                  >
                    <Select placeholder='Start year' options={[]} />
                  </Form.Item>
                </Col>
                <Col span={6} className=''>
                  <Form.Item
                    name={['project_experience', index, 'end_month']}
                    label="End Date"
                    rules={[{ required: true, message: 'Please input month!' }]}
                    labelCol={{ span: 24 }}
                    style={{ marginBottom: 5 }}
                  >
                    <Select placeholder='End month' options={[]} />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name={['project_experience', index, 'end_year']}
                    rules={[{ required: true, message: 'Please input year!' }]}
                    labelCol={{ span: 24 }}
                    style={{ marginBottom: 5 }}
                  >
                    <Select placeholder='End year' options={[]} />
                  </Form.Item>
                </Col>
                <Col span={7} push={12}>
                  <Form.Item
                    name={['project_experience', index, 'current']}
                    labelCol={{ span: 24 }}
                    style={{ marginBottom: 5 }}
                  >
                    <Checkbox>I currently work in this Project</Checkbox>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col span={6}>
              <div style={{ display: 'flex' }} className='my-10 justify-end'>
                {index > 0 && <DeleteOutlined onClick={() => handleRemoveProjects(index)} className='text-blue-600 text-xl' />}
              </div>
            </Col>
          </Row>
        ))}
        <div className='flex justify-end'>
          <Form.Item>
            <Button style={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'center' }}
              icon={<DoubleRightOutlined className='ml-1' />}
              size='large' type="primary" htmlType="submit" >
              Next
            </Button>
          </Form.Item>
        </div>
      </Card>
    </Form>
  );
}
