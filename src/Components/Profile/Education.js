import React, { useCallback, useState, useEffect } from 'react';
import { Button, Form, Input, Row, Col, DatePicker, Card } from 'antd';
import { DoubleRightOutlined, DeleteOutlined } from '@ant-design/icons';
import dayjs from 'dayjs'

const dateFormat = 'DD-MM-YYYY'

export default function Education({ current, setCurrent, educational_details, handleSetProfile }) {
  const [educationDetails, setEducationDetails] = useState([{}]);
  const [form] = Form.useForm()

  useEffect(() => {
    if (educational_details && educational_details.length > 0) {
      const eduDtl = educational_details.map((edu, i) => {
        return { ...edu, graduation_year: dayjs(edu.graduation_year, dateFormat) }
      })
      setEducationDetails(eduDtl)
      form.setFieldsValue({
        educational_details: eduDtl
      })
    }
  }, [educational_details])

  const handleEducationDetail = () => {
    setEducationDetails([...educationDetails, {}]);
  };

  const handleRemoveEducation = (index) => {
    const updatedEducation = [...educationDetails];
    updatedEducation.splice(index, 1);
    setEducationDetails(updatedEducation);
  };

  const onFinish = useCallback((values) => {
    const formValues = values.educational_details.map((val, i) => {
      return { ...val, graduation_year: dayjs(val.graduation_year).format(dateFormat) }
    })

    handleSetProfile(formValues, 'educational_details')
  }, [educational_details]);

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

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
                <Col span={10}>
                  <Form.Item
                    name={['educational_details', index, 'graduation_year']}
                    label="Graduation Date"
                    rules={[{ required: true, message: 'Please select graduation year!' }]}
                    labelCol={{ span: 24 }}
                    style={{ marginBottom: 5 }}
                  >
                    <DatePicker format={dateFormat} />
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
