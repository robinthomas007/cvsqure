import React, { useCallback, useState, useEffect } from 'react';
import { Button, Form, Input, Row, Col, Checkbox, Card, Select, DatePicker } from 'antd';
import { DoubleRightOutlined, DeleteOutlined } from '@ant-design/icons';
import dayjs from 'dayjs'

const dateFormat = 'DD-MM-YYYY'

export default function JobHistory({ work_histories, handleSetProfile }) {
  const [jobHistories, setJobHistories] = useState([{}]);

  const [form] = Form.useForm()

  useEffect(() => {
    if (work_histories && work_histories.length > 0) {
      const jobDtl = work_histories.map((work, i) => {
        return { ...work, start_date: dayjs(work.start_date, dateFormat), end_date: dayjs(work.end_date, dateFormat) }
      })
      setJobHistories(jobDtl)
      form.setFieldsValue({
        work_histories: jobDtl
      })
    }
  }, [work_histories])

  const handleAddJobHistory = () => {
    setJobHistories([...jobHistories, {}]);
  };

  const handleRemoveJobHistory = (index) => {
    const updatedJobHistories = [...jobHistories];
    updatedJobHistories.splice(index, 1);
    setJobHistories(updatedJobHistories);
  };

  const onFinish = useCallback((values) => {
    const formValues = values.work_histories.map((val, i) => {
      return { ...val, start_date: dayjs(val.start_date).format(dateFormat), end_date: dayjs(val.end_date).format(dateFormat) }
    })

    handleSetProfile(formValues, 'work_histories')
  }, [work_histories]);

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleStartDateChange = (date, dateString, index) => {
  };

  const handleEndDateChange = (date, dateString, index) => {
    const newValue = form.getFieldsValue();
    newValue.work_histories[index].current = date ? false : true;
    form.setFieldsValue(newValue);
  };

  const handleCheckBoxChange = (e, index) => {
    console.log(e.target.checked, index)

    const newValue = form.getFieldsValue();
    newValue.work_histories[index].end_date = e.target.checked ? undefined : dayjs();
    form.setFieldsValue(newValue);

  }

  return (
    <Form
      name="job_history_form"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      labelAlign="top"
      form={form}
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
                    name={['work_histories', index, 'job_title']}
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
                    name={['work_histories', index, 'company']}
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
                    name={['work_histories', index, 'location']}
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
                    name={['work_histories', index, 'start_date']}
                    label="Start Date"
                    rules={[{ required: true, message: 'Please input location!' }]}
                    labelCol={{ span: 24 }}
                    style={{ marginBottom: 5 }}
                  >
                    <DatePicker format={dateFormat} onChange={(date, dateString) => handleStartDateChange(date, dateString, index)} />
                  </Form.Item>
                </Col>

                <Col span={6} className=''>
                  <Form.Item
                    name={['work_histories', index, 'end_date']}
                    label="End Date"
                    rules={[{ required: true, message: 'Please input location!' }]}
                    labelCol={{ span: 24 }}
                    style={{ marginBottom: 5 }}
                  >
                    <DatePicker format={dateFormat} onChange={(date, dateString) => handleEndDateChange(date, dateString, index)} />
                  </Form.Item>
                </Col>

                <Col span={6} push={1}>
                  <Form.Item
                    name={['work_histories', index, 'current']}
                    labelCol={{ span: 24 }}
                    style={{ marginBottom: 5 }}
                    valuePropName="checked"
                  >
                    <Checkbox onChange={(e) => handleCheckBoxChange(e, index)}>I currently work here</Checkbox>
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
