import React, { useEffect } from 'react';
import { Button, Form, Input, Row, Col, DatePicker, Modal } from 'antd';
import dayjs from 'dayjs'

const dateFormat = 'MMM-YYYY';

export default function CertificationModal({ open, handleCancel, certifications, handleSetProfile, certificate }) {

  const [form] = Form.useForm()

  useEffect(() => {
    if (certificate)
      form.setFieldsValue({ ...certificate, expires_on: dayjs(certificate.expires_on, dateFormat) })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [certificate])

  const onFinish = (values) => {
    const data = { ...values, expires_on: dayjs(values.expires_on).format(dateFormat) }
    if (certificate?.id) {
      const updatedCertifications = certifications.map(work => {
        if (work.id === certificate.id) {
          return data;
        }
        return work;
      });
      handleSetProfile(updatedCertifications, 'certifications');
    } else {
      handleSetProfile([...certifications, data], 'certifications')
    }
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Modal
      title={<div className='text-teal-700 text-2xl'>Job History</div>}
      open={open}
      onCancel={handleCancel}
      destroyOnClose
      width={700}
      footer={[
        <Button key="back" size='large' style={{ padding: '0px 30px' }} onClick={handleCancel}>
          Cancel
        </Button>,
        <Button form="job_history_form" size='large' style={{ padding: '0px 30px' }} key="submit" htmlType="submit" type="primary">
          Add
        </Button>,
      ]}
    >
      <Form
        name="job_history_form"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        labelAlign="top"
        form={form}
      >
        <Row gutter={16} className='items-end'>
          <Col span={24}>
            <Form.Item
              name='url'
              label="Certification URL"
              rules={[
                { type: 'url', warningOnly: true, message: 'Invalid url' },
                { type: 'string', min: 6, message: 'min 6 character is required' }]}
              labelCol={{ span: 24 }}
              style={{ marginBottom: 10 }}
            >
              <Input placeholder='Certification URL' />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name='name'
              label="Certification Name"
              // rules={[{ required: true, message: 'Please select name!' }]}
              labelCol={{ span: 24 }}
              style={{ marginBottom: 10 }}
            >
              <Input placeholder='Certification Name' />
            </Form.Item>
          </Col>
          <Col span={24} >
            <Form.Item
              name='issued_by'
              label="Issued by"
              // rules={[{ required: true, message: 'Please select issue by!' }]}
              labelCol={{ span: 24 }}
              style={{ marginBottom: 10 }}
            >
              <Input placeholder='Issyed By' />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name='expires_on'
              label="Expires on"
              // rules={[{ required: true, message: 'Please select expires on!' }]}
              labelCol={{ span: 24 }}
              style={{ marginBottom: 10 }}
            >
              <DatePicker picker='month' className='w-full' format={dateFormat} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
