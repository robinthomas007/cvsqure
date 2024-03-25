import React, { useCallback, useState, useEffect } from 'react';
import { Button, Form, Input, Row, Col, Card, DatePicker } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import dayjs from 'dayjs'

const dateFormat = 'DD-MM-YYYY'

export default function Certification({ certifications, handleSetProfile }) {
  const [certificates, setCertificates] = useState([{}]);

  const [form] = Form.useForm()

  useEffect(() => {
    if (certifications && certifications.length > 0) {
      const certDetail = certifications.map((cer, i) => {
        return { ...cer, expires_on: dayjs(cer.expires_on, dateFormat) }
      })
      setCertificates(certDetail)
      form.setFieldsValue({
        certifications: certDetail
      })
    }
  }, [certifications])

  const handleAddSkills = () => {
    setCertificates([...certificates, {}]);
  };

  const handleRemoveSkills = (index) => {
    const updateSkills = [...certificates];
    updateSkills.splice(index, 1);
    setCertificates(updateSkills);
  };

  const onFinish = useCallback((values) => {
    console.log(values, "valuesvalues")
    const formValues = values.certifications.map((val, i) => {
      return { ...val, expires_on: dayjs(val.expires_on).format(dateFormat) }
    })
    handleSetProfile(formValues, 'certifications')
  }, []);

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
          What Certification do you have?
        </div>
        <Button type="primary" onClick={handleAddSkills}>
          Add Skills
        </Button>
      </div>}>

        {certificates.map((job, index) => (
          <Row key={index} gutter={16} className={`p-2 ${index !== certificates.length - 1 ? '' : ''}`}>
            <Col span={18}>
              <Row gutter={16} className='items-end'>
                <Col span={20}>
                  <Form.Item
                    name={['certifications', index, 'url']}
                    rules={[
                      { type: 'url', warningOnly: true, message: 'Invalid url' },
                      { type: 'string', min: 6, message: 'min 6 character is required' }]}
                    labelCol={{ span: 24 }}
                    style={{ marginBottom: 10 }}
                  >
                    <Input placeholder='Url' />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name={['certifications', index, 'name']}
                    // rules={[{ required: true, message: 'Please select name!' }]}
                    labelCol={{ span: 24 }}
                    style={{ marginBottom: 10 }}
                  >
                    <Input placeholder='Name' />
                  </Form.Item>
                </Col>
                <Col span={6} push={2}>
                  <Form.Item
                    name={['certifications', index, 'issued_by']}
                    // rules={[{ required: true, message: 'Please select issue by!' }]}
                    labelCol={{ span: 24 }}
                    style={{ marginBottom: 10 }}
                  >
                    <Input placeholder='Issyed By' />
                  </Form.Item>
                </Col>
                <Col span={6} push={2}>
                  <Form.Item
                    name={['certifications', index, 'expires_on']}
                    // rules={[{ required: true, message: 'Please select expires on!' }]}
                    labelCol={{ span: 24 }}
                    style={{ marginBottom: 10 }}
                  >
                    <DatePicker className='w-full' format={dateFormat} />
                  </Form.Item>
                </Col>

                <Col span={6} push={2}>
                  <div style={{ display: 'flex' }} className='justify-start items-center'>
                    {index > 0 && <DeleteOutlined onClick={() => handleRemoveSkills(index)} className='text-blue-600 text-xl' />}
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        ))}
        <div className='flex justify-end mt-4'>
          <Form.Item>
            <Button style={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'center' }}
              size='large' type="primary" htmlType="submit" >
              Submit For Approval
            </Button>
          </Form.Item>
        </div>
      </Card>
    </Form>
  );
}
