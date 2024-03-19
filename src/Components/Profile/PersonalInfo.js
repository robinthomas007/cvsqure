import React, { useCallback } from 'react'
import { Button, Form, Input, Row, Col, Upload, Avatar } from 'antd';
import { LoadingOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';

const { TextArea } = Input

export default function PersonalInfo({ current, setCurrent }) {

  const onFinish = useCallback((values) => {
    setCurrent(current + 1)
  }, []);


  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    setCurrent(current + 1)
  };


  return (
    <Row justify="start border p-10">
      <Col span={24} className='text-center'>
        <h2 className='text-3xl font-semibold mb-8'>Personal Info</h2>
      </Col>
      <Col span={24}>
        <Form
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          labelAlign="top"
        >
          <Row>
            <Col span={6}>
              <div className='flex flex-col items-center'>
                <Avatar style={{ width: 150, fontSize: 60, height: 150 }} className='my-2' shape="square" size={14} icon={<UserOutlined />} />
                <Upload
                  name="file"
                  // onChange={handleChange}
                  showUploadList={false}
                  maxCount={1}
                  beforeUpload={() => false}
                >
                  <button type="button" className='rounded-xl border p-2 text-blue-900 border-blue-800 my-4'>
                    Upload Photo
                  </button>
                </Upload>
              </div>

            </Col>
            <Col span={18}>
              <div className='grid grid-cols-2 gap-4'>
                <Form.Item
                  label="First Name"
                  name="firstname"
                  rules={[{ required: true, message: 'Please input your firstname!' }]}
                  labelAlign="top"
                  labelCol={{ span: 24 }}
                  style={{ marginBottom: 5 }}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Surname"
                  name="surname"
                  rules={[{ required: true, message: 'Please input your surname!' }]}
                  labelCol={{ span: 24 }}
                  style={{ marginBottom: 5 }}
                >
                  <Input />
                </Form.Item>
              </div>
              <div className='grid grid-cols-1 gap-4'>
                <Form.Item
                  label="Profession"
                  name="profession"
                  rules={[{ required: true, message: 'Please input your profession!' }]}
                  labelCol={{ span: 24 }}
                  style={{ marginBottom: 5 }}
                >
                  <Input />
                </Form.Item>
              </div>
              <div className='grid grid-cols-4 gap-4'>
                <div className='col-span-2'>
                  <Form.Item
                    label="City"
                    name="city"
                    rules={[{ required: true, message: 'Please input your city!' }]}
                    labelCol={{ span: 24 }}
                    style={{ marginBottom: 5 }}
                  >
                    <Input />
                  </Form.Item>
                </div>
                <div className='grid grid-cols-2 gap-4 col-span-2'>
                  <Form.Item
                    label="Country"
                    name="country"
                    rules={[{ required: true, message: 'Please input your country!' }]}
                    labelCol={{ span: 24 }}
                    style={{ marginBottom: 5 }}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Pin Code"
                    name="pincode"
                    rules={[{ required: true, message: 'Please input your pincode!' }]}
                    labelCol={{ span: 24 }}
                    wrapperCol={24}
                    style={{ marginBottom: 5 }}
                  >
                    <Input />
                  </Form.Item>
                </div>

              </div>
              <div className='grid grid-cols-2 gap-4'>
                <Form.Item
                  label="Phone"
                  name="phone"
                  rules={[{ required: true, message: 'Please input your phone!' }]}
                  labelAlign="top"
                  labelCol={{ span: 24 }}
                  style={{ marginBottom: 5 }}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[{ required: true, message: 'Please input your email!' }]}
                  labelCol={{ span: 24 }}
                  style={{ marginBottom: 5 }}
                >
                  <Input />
                </Form.Item>
              </div>

              <div className='grid grid-cols-1 gap-4'>
                <Form.Item
                  label="Summary"
                  name="summary"
                  rules={[{ required: true, message: 'Please input your summary!' }]}
                  labelCol={{ span: 24 }}
                >
                  <TextArea rows={4} />
                </Form.Item>
              </div>

              <Form.Item wrapperCol={{}}>
                <Button style={{ position: 'absolute', right: 0 }} type="primary" htmlType="submit">
                  Save
                </Button>
              </Form.Item>

            </Col>
          </Row>

        </Form>
      </Col>
    </Row>
  )
}
