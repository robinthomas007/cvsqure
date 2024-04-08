import React, { useCallback, useEffect, useState } from 'react';
import { Button, Form, Input, Row, Col, Upload, Modal } from 'antd';

import { PlusSignCircleIcon } from "hugeicons-react";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [personal_details])

  const onFinish = useCallback((values) => {
    const formattedAddress = Object.values(values.address).join(',');
    delete values.address;
    const personal_dtl = {
      ...values,
      address: formattedAddress
    };
    handleSetProfile(personal_dtl, 'personal_details')
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <Row gutter={[16]}>
        <Col xs={24} sm={24} md={24} lg={24}>
          <div>
            <h2 className='text-gray-700 text-3xl my-2'>Personal Information</h2>
            <p className='text-gray-500 text-lg mb-6'>let's get to know you a little better.</p>
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={18}>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Form.Item
              label="Full Name"
              name="name"
              rules={[{ required: true, message: '' }]}
              labelAlign="top"
              labelCol={{ span: 24 }}
              style={{ marginBottom: 5 }}
            >
              <Input size="large" placeholder='Full Name' />
            </Form.Item>
            <Form.Item
              label="Employee Number"
              name="employee_number"
              rules={[{ required: true, message: '' }]}
              labelCol={{ span: 24 }}
              style={{ marginBottom: 5 }}
            >
              <Input size="large" placeholder='Employee Number' />
            </Form.Item>
          </div>
          <div className='grid grid-cols-1 gap-4'>
            <Form.Item
              label="Designation"
              name="profession"
              rules={[{ required: true, message: '' }]}
              labelCol={{ span: 24 }}
              style={{ marginBottom: 5 }}
            >
              <Input size="large" placeholder='Profession' />
            </Form.Item>
          </div>
          <div className='grid grid-cols-4 md:grid-cols-4 gap-4 xs:grid-cols-1'>
            <div className='col-span-2'>
              <Form.Item
                label="City"
                name={["address", "city"]}
                rules={[{ required: true, message: '' }]}
                labelCol={{ span: 24 }}
                style={{ marginBottom: 5 }}
              >
                <Input size="large" placeholder='City' />
              </Form.Item>
            </div>
            <Form.Item
              label="Country"
              name={["address", "country"]}
              rules={[{ required: true, message: '!' }]}
              labelCol={{ span: 24 }}
              style={{ marginBottom: 5 }}
            >
              <Input size="large" placeholder='Country' />
            </Form.Item>
            <Form.Item
              label="Pin Code"
              name={["address", "pincode"]}
              rules={[{ required: true, message: '' }]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              style={{ marginBottom: 5 }}
            >
              <Input size="large" placeholder='Pincode' />
            </Form.Item>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Form.Item
              label="Mobile Number"
              name="phone_number"
              rules={[{ required: true, message: '' }]}
              labelAlign="top"
              labelCol={{ span: 24 }}
              style={{ marginBottom: 5 }}
            >
              <Input size="large" placeholder='Phone' />
            </Form.Item>
            <Form.Item
              label="Official Email ID"
              name="email"
              rules={[{ required: true, message: '' }, { type: 'email', message: '' }]}
              labelCol={{ span: 24 }}
              style={{ marginBottom: 5 }}
            >
              <Input size="large" placeholder='Email' />
            </Form.Item>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Form.Item
              label="Linkedin Profile link"
              name="linkdin"
              rules={[{ required: true, message: '' }]}
              labelAlign="top"
              labelCol={{ span: 24 }}
              style={{ marginBottom: 5 }}
            >
              <Input size="large" placeholder='Linkedin Profile link' />
            </Form.Item>
            <Form.Item
              label="Personal portfolio/ Medium/Opensource Contributions"
              name="portfolio"
              rules={[{ required: false, message: '' }]}
              labelCol={{ span: 24 }}
              style={{ marginBottom: 5 }}
            >
              <Input size="large" placeholder='Personal portfolio' />
            </Form.Item>
          </div>
          <div className='grid grid-cols-1 gap-4'>
            <Form.Item
              label="Professional Summary (highlight your experience, competency, and aspirations)"
              name="summary"
              rules={[{ required: true, message: '' }, { min: 150 }]}
              labelCol={{ span: 24 }}
            >
              <TextArea rows={4} placeholder='Summary (min length 150, max length 300)' minLength={150} maxLength={300} />
            </Form.Item>
          </div>
          <div className='flex justify-end'>
            <Form.Item>
              <Button
                style={{ padding: '0px 30px' }}
                className="md:w-auto md:justify-end"
                size='large'
                type="primary"
                htmlType="submit"
              >
                Next
              </Button>
            </Form.Item>
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={6}>
          <div className='sm:ml-10'>
            <Upload
              listType="picture-circle"
              maxCount={1}
              beforeUpload={() => false}
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              className='profile-upload'
            >
              {fileList.length >= 1 ? null : <button style={{ border: 0, background: 'none' }} className='flex flex-col items-center justify-center' type="button">
                <PlusSignCircleIcon
                  size={24}
                  color={"#F99417"}
                  variant={"stroke"}
                />
                <div className='text-teal-700 font-semibold' style={{ marginTop: 8 }}>Upload Photo</div>
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
            <p className='text-center w-full mt-2 text-sm px-4'>
              Upload the photo in a common format like <span className='text-teal-700 font-semibold'>JPEG</span> or <span className='text-teal-700 font-semibold'>PNG</span>, with a file size ideally under <span className='text-teal-700 font-semibold'>1 MB</span>.
            </p>
          </div>
        </Col>
      </Row>
    </Form>

  );
}
