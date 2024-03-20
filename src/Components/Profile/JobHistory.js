import React, { useCallback, useState } from 'react';
import { Button, Form, Input, Row, Col, Checkbox, Card, Select } from 'antd';
import { DoubleRightOutlined, DeleteOutlined } from '@ant-design/icons';

export default function JobHistory({ current, setCurrent }) {
  const [jobHistories, setJobHistories] = useState([{}]);

  const handleAddJobHistory = () => {
    setJobHistories([...jobHistories, {}]);
  };

  const handleRemoveJobHistory = (index) => {
    const updatedJobHistories = [...jobHistories];
    updatedJobHistories.splice(index, 1);
    setJobHistories(updatedJobHistories);
  };

  const onFinish = useCallback((values) => {
    console.log(values, "valuesvaluesvalues2")
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
          Job History
        </div>
        <Button type="primary" onClick={handleAddJobHistory}>
          Add Job History
        </Button>
      </div>}>
        {jobHistories.map((job, index) => (
          <Row key={index} gutter={16} className={`p-10 ${index !== jobHistories.length - 1 ? 'border-b-2' : ''}`}>
            <Col span={18}>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name={['job_histories', index, 'job_title']}
                    label="Job Title"
                    rules={[{ required: true, message: 'Please input job title!' }]}
                    labelCol={{ span: 24 }}
                    style={{ marginBottom: 5 }}
                  >
                    <Input placeholder="Job Title" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name={['job_histories', index, 'company']}
                    label="Company"
                    rules={[{ required: true, message: 'Please input company!' }]}
                    labelCol={{ span: 24 }}
                    style={{ marginBottom: 5 }}
                  >
                    <Input placeholder="Company" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name={['job_histories', index, 'location']}
                    label="Location"
                    rules={[{ required: true, message: 'Please input location!' }]}
                    labelCol={{ span: 24 }}
                    style={{ marginBottom: 5 }}
                  >
                    <Input placeholder="Location" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16} className='items-end'>
                <Col span={6}>
                  <Form.Item
                    name={['job_histories', index, 'start_month']}
                    label="Start Date"
                    rules={[{ required: true, message: 'Please input location!' }]}
                    labelCol={{ span: 24 }}
                    style={{ marginBottom: 5 }}
                  >
                    <Select placeholder='Start month' options={[]} />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name={['job_histories', index, 'start_year']}
                    rules={[{ required: true, message: 'Please input location!' }]}
                    labelCol={{ span: 24 }}
                    style={{ marginBottom: 5 }}
                  >
                    <Select placeholder='Start year' options={[]} />
                  </Form.Item>
                </Col>
                <Col span={6} className=''>
                  <Form.Item
                    name={['job_histories', index, 'end_month']}
                    label="End Date"
                    rules={[{ required: true, message: 'Please input location!' }]}
                    labelCol={{ span: 24 }}
                    style={{ marginBottom: 5 }}
                  >
                    <Select placeholder='End month' options={[]} />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name={['job_histories', index, 'end_year']}
                    rules={[{ required: true, message: 'Please input location!' }]}
                    labelCol={{ span: 24 }}
                    style={{ marginBottom: 5 }}
                  >
                    <Select placeholder='End year' options={[]} />
                  </Form.Item>
                </Col>
                <Col span={6} push={12}>
                  <Form.Item
                    name={['job_histories', index, 'current']}
                    labelCol={{ span: 24 }}
                    style={{ marginBottom: 5 }}
                  >
                    <Checkbox>I currently work here</Checkbox>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col span={6}>
              <div style={{ display: 'flex' }} className='my-10 justify-end'>
                {index > 0 && <DeleteOutlined onClick={() => handleRemoveJobHistory(index)} className='text-blue-600 text-xl' />}
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
