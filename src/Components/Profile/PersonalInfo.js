import React, { useCallback, useEffect, useState } from 'react';
import { Button, Form, Input, Row, Col, Upload, Avatar, Card, Modal } from 'antd';
import { LoadingOutlined, PlusOutlined, DoubleRightOutlined } from '@ant-design/icons';

const { TextArea } = Input;

export default function PersonalInfo({ personal_details, handleSetProfile }) {
  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  const [form] = Form.useForm()

  useEffect(() => {
    if (personal_details) {
      if (personal_details.photo_url) {
        setFileList([{ url: personal_details.photo_url }])
      }
      const full_address = personal_details.address ? personal_details.address.split(',') : []
      form.setFieldsValue({
        ...personal_details, address: {
          city: full_address[0],
          country: full_address[1],
          pincode: full_address[2]
        }
      })
    }
  }, [personal_details])

  const onFinish = useCallback((values) => {
    const formattedAddress = Object.values(values.address).join(',');
    delete values.address;
    const personal_dtl = {
      ...values,
      address: formattedAddress
    };
    handleSetProfile(personal_dtl, 'personal_details')
  }, [personal_details]);

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  return (
    <Form
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      labelAlign="top"
      form={form}
    >
      <Card
        title={<div className='font-semibold text-2xl py-4 md:py-6 text-blue-500'>Personal Information</div>}
        className='shadow-2xl'
        style={{ minWidth: '300px', maxWidth: '100%', margin: 'auto' }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24} lg={18}>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <Form.Item
                label="Full Name"
                name="name"
                rules={[{ required: true, message: 'Please input your fullname!' }]}
                labelAlign="top"
                labelCol={{ span: 24 }}
                style={{ marginBottom: 5 }}
              >
                <Input placeholder='Full Name' />
              </Form.Item>
              <Form.Item
                label="Employee Number"
                name="employee_number"
                rules={[{ required: true, message: 'Please input your employee number!' }]}
                labelCol={{ span: 24 }}
                style={{ marginBottom: 5 }}
              >
                <Input placeholder='Employee Number' />
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
                <Input placeholder='Profession' />
              </Form.Item>
            </div>
            <div className='grid grid-cols-4 md:grid-cols-4 gap-4 xs:grid-cols-1'>
              <div className='col-span-2'>
                <Form.Item
                  label="City"
                  name={["address", "city"]}
                  rules={[{ required: true, message: 'Please input your city!' }]}
                  labelCol={{ span: 24 }}
                  style={{ marginBottom: 5 }}
                >
                  <Input placeholder='City' />
                </Form.Item>
              </div>
              <Form.Item
                label="Country"
                name={["address", "country"]}
                rules={[{ required: true, message: 'Please input your country!' }]}
                labelCol={{ span: 24 }}
                style={{ marginBottom: 5 }}
              >
                <Input placeholder='Country' />
              </Form.Item>
              <Form.Item
                label="Pin Code"
                name={["address", "pincode"]}
                rules={[{ required: true, message: 'Please input your pincode!' }]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                style={{ marginBottom: 5 }}
              >
                <Input placeholder='Pincode' />
              </Form.Item>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <Form.Item
                label="Phone"
                name="phone_number"
                rules={[{ required: true, message: 'Please input your phone!' }]}
                labelAlign="top"
                labelCol={{ span: 24 }}
                style={{ marginBottom: 5 }}
              >
                <Input placeholder='Phone' />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }, { type: 'email', message: "Email is not valid" }]}
                labelCol={{ span: 24 }}
                style={{ marginBottom: 5 }}
              >
                <Input placeholder='Email' />
              </Form.Item>
            </div>
            <div className='grid grid-cols-1 gap-4'>
              <Form.Item
                label="Summary"
                name="summary"
                rules={[{ required: true, message: 'Please input your summary!' }]}
                labelCol={{ span: 24 }}
              >
                <TextArea rows={4} placeholder='Summary' />
              </Form.Item>
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={6}>
            <div className='ml-2 sm:ml-20'>
              <Upload
                listType="picture-card"
                maxCount={1}
                beforeUpload={() => false}
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                className='profile-upload'
              >
                {fileList.length >= 1 ? null : <button style={{ border: 0, background: 'none' }} type="button">
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </button>}
              </Upload>
              <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img
                  alt="example"
                  style={{
                    width: '100%',
                  }}
                  src={previewImage}
                />
              </Modal>
            </div>
          </Col>
        </Row>
        <div className='flex justify-end'>
          <Form.Item>
            <Button
              className="md:w-auto md:justify-end"
              icon={<DoubleRightOutlined className='ml-1' />}
              size={{ xs: 'large', sm: 'large', md: 'middle' }}
              type="primary"
              htmlType="submit"
            >
              Save And Next
            </Button>
          </Form.Item>
        </div>
      </Card>
    </Form>

  );
}
