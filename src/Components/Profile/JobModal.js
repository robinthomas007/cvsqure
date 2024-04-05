import React, { useEffect } from 'react';
import { Button, Form, Input, Row, Col, Checkbox, DatePicker, Modal } from 'antd';
import dayjs from 'dayjs'
const { TextArea } = Input
const dateFormat = 'MMM-YYYY';

const JobModal = ({ open, handleCancel, work_histories, handleSetProfile, job }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (job)
      form.setFieldsValue({ ...job, start_date: dayjs(job.start_date, dateFormat), end_date: dayjs(job.end_date, dateFormat) })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [job])

  const onFinish = (values) => {
    const data = { ...values, start_date: dayjs(values.start_date).format(dateFormat), end_date: dayjs(values.end_date).format(dateFormat) }
    if (job?.id) {
      const updatedWorkHistories = work_histories.map(work => {
        if (work.id === job.id) {
          return data;
        }
        return work;
      });
      handleSetProfile(updatedWorkHistories, 'work_histories');
    } else {
      handleSetProfile([...work_histories, data], 'work_histories')
    }
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Modal
      title={<div className='text-teal-700 text-2xl'>Work History</div>}
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

        <Row gutter={16}>
          <Col span={24}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name='job_title'
                  label="Designation"
                  rules={[{ required: true, message: 'Please input job title!' }]}
                  labelCol={{ span: 24 }}
                  style={{ marginBottom: 5 }}
                >
                  <Input placeholder="Job Title" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name='company'
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
              <Col span={24}>
                <Form.Item
                  name='location'
                  label="Location"
                  rules={[{ required: true, message: 'Please input location!' }]}
                  labelCol={{ span: 24 }}
                  style={{ marginBottom: 5 }}
                >
                  <Input placeholder="Location" />
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item
                  name='current'
                  labelCol={{ span: 24 }}
                  style={{ marginBottom: 5 }}
                  valuePropName="checked"
                >
                  <Checkbox className='text-base'>I currently work here</Checkbox>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16} className='items-end'>
              <Col span={12}>
                <Form.Item
                  name='start_date'
                  label="Start Date"
                  rules={[{ required: true, message: 'Please input location!' }]}
                  labelCol={{ span: 24 }}
                >
                  <DatePicker picker="month" format={dateFormat} className='w-full' />
                </Form.Item>
              </Col>

              <Col span={12} className=''>
                <Form.Item
                  name='end_date'
                  label="End Date"
                  rules={[{ required: true, message: 'Please input location!' }]}
                  labelCol={{ span: 24 }}
                >
                  <DatePicker picker="month" format={dateFormat} className='w-full' />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name='description'
                  label="Description"
                  rules={[{ required: true, message: 'Write your roles and responsibility in your job' }]}
                  labelCol={{ span: 24 }}
                  style={{ marginBottom: 5 }}
                >
                  <TextArea rows={4} placeholder="Write your roles and responsibility in your job" />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default JobModal;
