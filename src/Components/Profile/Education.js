import React, { useCallback, useState } from 'react';
import { Button, Form, Input, Row, Col, Checkbox, Card, Select } from 'antd';
import { DoubleRightOutlined, DeleteOutlined } from '@ant-design/icons';

export default function Education({ current, setCurrent }) {
  const [educationDetails, setEducationDetails] = useState([{}]);

  const handleEducationDetail = () => {
    setEducationDetails([...educationDetails, {}]);
  };

  const handleRemoveEducation = (index) => {
    const updatedEducation = [...educationDetails];
    updatedEducation.splice(index, 1);
    setEducationDetails(updatedEducation);
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
          Education
        </div>
        <Button type="primary" onClick={handleEducationDetail}>
          Add Education
        </Button>
      </div>}>
        {educationDetails.map((job, index) => (
          <Row key={index} gutter={16} className={`p-10 ${index !== educationDetails.length - 1 ? 'border-b-2' : ''}`}>
            <Col span={18}>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name={['educational_details', index, 'university']}
                    label="University / College Name"
                    rules={[{ required: true, message: 'Please input university!' }]}
                    labelCol={{ span: 24 }}
                    style={{ marginBottom: 5 }}
                  >
                    <Input placeholder="University / College Name" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name={['educational_details', index, 'location']}
                    label="University / College Location"
                    rules={[{ required: true, message: 'Please input Location!' }]}
                    labelCol={{ span: 24 }}
                    style={{ marginBottom: 5 }}
                  >
                    <Input placeholder="University / College Location" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16} className='items-end'>
                <Col span={12}>
                  <Form.Item
                    name={['educational_details', index, 'degree']}
                    label="Degree"
                    rules={[{ required: true, message: 'Please input degree!' }]}
                    labelCol={{ span: 24 }}
                    style={{ marginBottom: 5 }}
                  >
                    <Input placeholder="Degree" />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name={['educational_details', index, 'month']}
                    label="Graduation Date"
                    rules={[{ required: true, message: 'Please input month!' }]}
                    labelCol={{ span: 24 }}
                    style={{ marginBottom: 5 }}
                  >
                    <Select placeholder='Select month' options={[]} />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name={['educational_details', index, 'year']}
                    rules={[{ required: true, message: 'Please input year!' }]}
                    labelCol={{ span: 24 }}
                    style={{ marginBottom: 5 }}
                  >
                    <Select placeholder='Select year' options={[]} />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col span={6}>
              <div style={{ display: 'flex' }} className='my-10 justify-end'>
                {index > 0 && <DeleteOutlined onClick={() => handleRemoveEducation(index)} className='text-blue-600 text-xl' />}
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
