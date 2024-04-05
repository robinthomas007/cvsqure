import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Row, Col, Checkbox, Modal, DatePicker } from 'antd';
import dayjs from 'dayjs'

const { TextArea } = Input
const dateFormat = 'MMM-YYYY';

export default function Project({ open, handleCancel, project_experiences, handleSetProfile, project }) {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [form] = Form.useForm()

  useEffect(() => {
    if (project)
      form.setFieldsValue({ ...project, start_date: dayjs(project.start_date, dateFormat), end_date: dayjs(project.end_date, dateFormat) })
  }, [project])

  const onFinish = (values) => {
    setConfirmLoading(true);
    setTimeout(() => {
      handleCancel();
      setConfirmLoading(false);
    }, 1000);
    const data = { ...values, start_date: dayjs(values.start_date).format(dateFormat), end_date: dayjs(values.end_date).format(dateFormat) }
    if (project?.id) {
      const updatedProjects = project_experiences.map(pr => {
        if (pr.id === project.id) {
          return data;
        }
        return pr;
      });
      handleSetProfile(updatedProjects, 'project_experiences');
    } else {
      handleSetProfile([...project_experiences, data], 'project_experiences')
    }
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Modal
      title={<div className='text-teal-700 text-2xl'>Project Experience</div>}
      open={open}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      destroyOnClose
      width={700}
      footer={[
        <Button key="back" size='large' style={{ padding: '0px 30px' }} onClick={handleCancel}>
          Cancel
        </Button>,
        <Button form="project_form" size='large' style={{ padding: '0px 30px' }} key="submit" htmlType="submit" type="primary">
          Add
        </Button>,
      ]}
    >
      <Form
        name="project_form"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        labelAlign="top"
        form={form}
        preserve={false}
      >
        <Row gutter={16} className='items-end'>
          <Col span={24}>
            <Form.Item
              name='name'
              label="Project Name"
              rules={[{ required: true, message: 'Please input Project Name!' }]}
              labelCol={{ span: 24 }}
              style={{ marginBottom: 5 }}
            >
              <Input placeholder="Project Name" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              name='description'
              label="Description"
              rules={[{ required: true, message: 'Please input company!' }]}
              labelCol={{ span: 24 }}
              style={{ marginBottom: 5 }}
            >
              <TextArea placeholder="Description" rows={4} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              name='roles_responsibilities'
              label="Roles & Responsibilities"
              rules={[{ required: true, message: 'Please input company!' }]}
              labelCol={{ span: 24 }}
              style={{ marginBottom: 5 }}
            >
              <TextArea placeholder="Roles & Responsibilities" rows={4} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          {/* <Col span={24}>
            <Form.Item
              name='tech_stack'
              label="Tech Stack"
              // rules={[{ required: true, message: 'Please input Tech Stack!' }]}
              labelCol={{ span: 24 }}
              style={{ marginBottom: 5 }}
            >
              <Input placeholder="Tech Stack" />
            </Form.Item>
          </Col> */}
          <Col span={12}>
            <Form.Item
              name='current'
              labelCol={{ span: 24 }}
              style={{ marginBottom: 5 }}
            >
              <Checkbox>Currently I’m working in this project</Checkbox>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16} className='items-end'>
          <Col span={12}>
            <Form.Item
              name='start_date'
              label="Start Date"
              rules={[{ required: true, message: 'Please input month!' }]}
              labelCol={{ span: 24 }}
              style={{ marginBottom: 5 }}
            >
              <DatePicker picker='month' className='w-full' format={dateFormat} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="End Date"
              name='end_date'
              rules={[{ required: true, message: 'Please input year!' }]}
              labelCol={{ span: 24 }}
              style={{ marginBottom: 5 }}
            >
              <DatePicker picker='month' className='w-full' format={dateFormat} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
