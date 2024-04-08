import React, { useEffect } from 'react';
import { Button, Form, Input, Row, Col, DatePicker, Modal } from 'antd';
import dayjs from 'dayjs'

const dateFormat = 'MMM-YYYY';

export default function Education({ open, handleCancel, educational_details, handleSetProfile, education }) {
  const [form] = Form.useForm()

  useEffect(() => {
    console.log(education, 'education')
    if (education)
      form.setFieldsValue({ ...education, graduation_year: dayjs(education.graduation_year, dateFormat) })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [education])

  const onFinish = (values) => {
    const data = { ...values, graduation_year: dayjs(values.graduation_year).format(dateFormat) }
    if (education?.id) {
      const updatedWorkHistories = educational_details.map(work => {
        if (work.id === education.id) {
          return data;
        }
        return work;
      });
      handleSetProfile(updatedWorkHistories, 'educational_details');
    } else {
      handleSetProfile([...educational_details, data], 'educational_details')
    }
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Modal
      title={<div className='text-teal-700 text-2xl'>Education</div>}
      open={open}
      onCancel={handleCancel}
      destroyOnClose
      width={700}
      footer={[
        <Button key="back" size='large' style={{ padding: '0px 30px' }} onClick={handleCancel}>
          Cancel
        </Button>,
        <Button form="education_form" size='large' style={{ padding: '0px 30px' }} key="submit" htmlType="submit" type="primary">
          Add
        </Button>,
      ]}
    >
      <Form
        name="education_form"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        labelAlign="top"
        form={form}
      >

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name='university'
              label="University / College Name"
              rules={[{ required: true, message: '' }]}
              labelCol={{ span: 24 }}
              style={{ marginBottom: 5 }}
            >
              <Input placeholder="University / College Name" />
            </Form.Item>
          </Col>

          <Col span={17}>
            <Form.Item
              name='degree'
              label="Degree"
              rules={[{ required: true, message: '' }]}
              labelCol={{ span: 24 }}
              style={{ marginBottom: 5 }}
            >
              <Input placeholder="Degree" />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item
              name='graduation_year'
              label="Graduation Date"
              rules={[{ required: true, message: '' }]}
              labelCol={{ span: 24 }}
              style={{ marginBottom: 5 }}
            >
              <DatePicker picker="month" format={dateFormat} className='w-full' />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              name='location'
              label="University / College Location"
              rules={[{ required: true, message: '' }]}
              labelCol={{ span: 24 }}
              style={{ marginBottom: 5 }}
            >
              <Input placeholder="University / College Location" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
