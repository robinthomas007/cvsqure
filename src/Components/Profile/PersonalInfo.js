import React, { useCallback, useState } from 'react';
import { Button, Form, Input, Row, Col, Upload, Avatar, Card, Modal } from 'antd';
import { LoadingOutlined, PlusOutlined, DoubleRightOutlined } from '@ant-design/icons';

const { TextArea } = Input;

export default function PersonalInfo({ current, setCurrent }) {
  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  const onFinish = useCallback((values) => {
    const formattedAddress = Object.values(values.address).join(', ');
    delete values.address;
    const personal_details = {
      user_id: 123,
      personal_details: {
        ...values,
        address: formattedAddress
      }
    };
    console.log(personal_details, 'valuesvaluesvaluesvaluesvalues');
  }, []);

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    setCurrent(current + 1);
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
    >
      <Card
        title={<div className='font-semibold text-2xl py-6 text-blue-500'>Personal Information</div>}
        className='shadow-2xl'
      >
        <Row>
          <Col span={18}>
            <div className='grid grid-cols-2 gap-4'>
              <Form.Item
                label="First Name"
                name="first_name"
                rules={[{ required: true, message: 'Please input your firstname!' }]}
                labelAlign="top"
                labelCol={{ span: 24 }}
                style={{ marginBottom: 5 }}
              >
                <Input placeholder='Firstname' />
              </Form.Item>
              <Form.Item
                label="Surname"
                name="surname"
                rules={[{ required: true, message: 'Please input your surname!' }]}
                labelCol={{ span: 24 }}
                style={{ marginBottom: 5 }}
              >
                <Input placeholder='Surname' />
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
            <div className='grid grid-cols-4 gap-4'>
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
              <div className='grid grid-cols-2 gap-4 col-span-2'>
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
                  wrapperCol={24}
                  style={{ marginBottom: 5 }}
                >
                  <Input placeholder='Pincode' />
                </Form.Item>
              </div>
            </div>
            <div className='grid grid-cols-2 gap-4'>
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
                rules={[{ required: true, message: 'Please input your email!' }]}
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
          <Col span={6}>
            <div className='ml-20'>
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
