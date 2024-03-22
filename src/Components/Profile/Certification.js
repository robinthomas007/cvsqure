import React, { useCallback, useState } from 'react';
import { Button, Form, Input, Row, Col, Rate, Card, Select } from 'antd';
import { DoubleRightOutlined, DeleteOutlined } from '@ant-design/icons';

export default function Certification({ current, setCurrent }) {
  const [skills, setSkills] = useState([{}]);

  const handleAddSkills = () => {
    setSkills([...skills, {}]);
  };

  const handleRemoveSkills = (index) => {
    const updateSkills = [...skills];
    updateSkills.splice(index, 1);
    setSkills(updateSkills);
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
          What Certification do you have?
        </div>
        <Button type="primary" onClick={handleAddSkills}>
          Add Skills
        </Button>
      </div>}>
        <Row className='p-2'>
          <Col span={18}>
            <Row className='p-2'>
              <Col span={18} push={2}>
                <Form.Item
                  name={['skills', 'url']}
                  rules={[{ required: true, message: 'Please select skills!' }]}
                  labelCol={{ span: 24 }}
                  style={{ marginBottom: 5 }}
                  label='Url'
                >
                  <Input placeholder='url' />
                </Form.Item>
              </Col>
            </Row>
          </Col>

        </Row>
        {skills.map((job, index) => (
          <Row key={index} gutter={16} className={`p-2 ${index !== skills.length - 1 ? '' : ''}`}>
            <Col span={18}>
              <Row gutter={16} className='items-end'>
                <Col span={6} push={2}>
                  <Form.Item
                    name={['details', index, 'name']}
                    rules={[{ required: true, message: 'Please select name!' }]}
                    labelCol={{ span: 24 }}
                    style={{ marginBottom: 5 }}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={6} push={2}>
                  <Form.Item
                    name={['details', index, 'issued_by']}
                    rules={[{ required: true, message: 'Please select issue by!' }]}
                    labelCol={{ span: 24 }}
                    style={{ marginBottom: 5 }}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={6} push={2}>
                  <Form.Item
                    name={['details', index, 'expires_on']}
                    rules={[{ required: true, message: 'Please select expires on!' }]}
                    labelCol={{ span: 24 }}
                    style={{ marginBottom: 5 }}
                  >

                    <Select placeholder='Select skills' options={[]} />
                  </Form.Item>
                </Col>

                <Col span={6} push={2}>
                  <div style={{ display: 'flex' }} className='justify-start items-center'>
                    {index > 0 && <DeleteOutlined onClick={() => handleRemoveSkills(index)} className='text-blue-600 text-xl' />}
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        ))}
        <div className='flex justify-end mt-4'>
          <Form.Item>
            <Button style={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'center' }}
              size='large' type="primary" htmlType="submit" >
              Submit For Approval
            </Button>
          </Form.Item>
        </div>
      </Card>
    </Form>
  );
}
