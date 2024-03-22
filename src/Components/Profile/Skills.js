import React, { useCallback, useState, useEffect } from 'react';
import { Button, Form, Input, Row, Col, Rate, Card, Select } from 'antd';
import { DoubleRightOutlined, DeleteOutlined } from '@ant-design/icons';

export default function Skills({ current, setCurrent, skillsSet, skills_data, handleSetProfile }) {
  const [skills, setSkills] = useState([{}]);

  const [form] = Form.useForm()

  useEffect(() => {
    if (skills_data && skills_data.length > 0) {
      setSkills(skills_data)
      form.setFieldsValue({
        skills: skills_data
      })
    }
  }, [skills_data])

  const handleAddSkills = () => {
    setSkills([...skills, {}]);
  };

  const handleRemoveSkills = (index) => {
    const updateSkills = [...skills];
    updateSkills.splice(index, 1);
    setSkills(updateSkills);
  };

  const onFinish = useCallback((values) => {

    handleSetProfile(values.skills, 'skills')
  }, [skills_data]);

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
          Skills
        </div>
        <Button type="primary" onClick={handleAddSkills}>
          Add Skills
        </Button>
      </div>}>
        {skills.map((job, index) => (
          <Row key={index} gutter={16} className={`p-2 ${index !== skills.length - 1 ? '' : ''}`}>
            <Col span={18}>
              <Row gutter={16} className='items-end'>
                <Col span={6} push={2}>
                  <Form.Item
                    name={['skills', index, 'name']}
                    rules={[{ required: true, message: 'Please select skills!' }]}
                    labelCol={{ span: 24 }}
                    style={{ marginBottom: 5 }}
                  >
                    <Select
                      placeholder='Select skills'
                      options={skillsSet.map((skill) => ({ label: skill.name, value: skill.name }))} />
                  </Form.Item>
                </Col>
                <Col span={6} push={2}>
                  <Form.Item
                    name={['skills', index, 'rating']}
                    rules={[{ required: true, message: 'Please select rating!' }]}
                    labelCol={{ span: 24 }}
                    style={{ marginBottom: 5 }}
                  >
                    <Rate />
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
