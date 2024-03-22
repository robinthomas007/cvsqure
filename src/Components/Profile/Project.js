import React, { useCallback, useState, useEffect } from 'react';
import { Button, Form, Input, Row, Col, Checkbox, Card, DatePicker } from 'antd';
import { DoubleRightOutlined, DeleteOutlined } from '@ant-design/icons';
import dayjs from 'dayjs'

const { TextArea } = Input
const dateFormat = 'DD-MM-YYYY'

export default function Project({ current, setCurrent, handleSetProfile, project_experiences }) {
  const [projects, setProjects] = useState([{}]);

  const [form] = Form.useForm()

  useEffect(() => {
    if (project_experiences && project_experiences.length > 0) {
      const projectDtl = project_experiences.map((pro, i) => {
        return { ...pro, start_date: dayjs(pro.start_date, dateFormat), end_date: dayjs(pro.end_date, dateFormat) }
      })
      setProjects(projectDtl)
      form.setFieldsValue({
        project_experiences: project_experiences
      })
    }
  }, [project_experiences])

  const handleAddProjects = () => {
    setProjects([...projects, {}]);
  };

  const handleRemoveProjects = (index) => {
    const updatedProejcts = [...projects];
    updatedProejcts.splice(index, 1);
    setProjects(updatedProejcts);
  };

  const onFinish = useCallback((values) => {
    const formValues = values.project_experiences.map((val, i) => {
      return { ...val, start_date: dayjs(val.start_date).format(dateFormat), end_date: dayjs(val.end_date).format(dateFormat) }
    })
    handleSetProfile(formValues, 'project_experiences')
  }, [project_experiences]);

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    setCurrent(current + 1);
  };

  return (
    <Form
      name="job_history_form"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      labelAlign="top"
    >
      <Card className='shadow-2xl' title={<div className='flex justify-between items-center'>
        <div className='font-semibold text-2xl py-6 text-blue-500'>
          Project Experience
        </div>
        <Button type="primary" onClick={handleAddProjects}>
          Add Project Experience
        </Button>
      </div>}>
        {projects.map((job, index) => (
          <Row key={index} gutter={16} className={`p-10 ${index !== projects.length - 1 ? 'border-b-2' : ''}`}>
            <Col span={18}>
              <Row gutter={16} className='items-end'>
                <Col span={12}>
                  <Form.Item
                    name={['project_experiences', index, 'name']}
                    label="Project Name"
                    rules={[{ required: true, message: 'Please input Project Name!' }]}
                    labelCol={{ span: 24 }}
                    style={{ marginBottom: 5 }}
                  >
                    <Input placeholder="Project Name" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name={['project_experiences', index, 'tech_stack']}
                    label="Tech Stack"
                    rules={[{ required: true, message: 'Please input Tech Stack!' }]}
                    labelCol={{ span: 24 }}
                    style={{ marginBottom: 5 }}
                  >
                    <Input placeholder="Tech Stack" />
                  </Form.Item>
                </Col>

              </Row>
              <Row>
                <Col span={24}>
                  <Form.Item
                    name={['project_experiences', index, 'roles_responsibilities']}
                    label="Roles & Responsibilities"
                    rules={[{ required: true, message: 'Please input company!' }]}
                    labelCol={{ span: 24 }}
                    style={{ marginBottom: 5 }}
                  >
                    <TextArea placeholder="Roles & Responsibilities" rows={4} />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name={['project_experiences', index, 'description']}
                    label="Description"
                    rules={[{ required: true, message: 'Please input company!' }]}
                    labelCol={{ span: 24 }}
                    style={{ marginBottom: 5 }}
                  >
                    <TextArea placeholder="Description" rows={4} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16} className='items-end'>
                <Col span={6}>
                  <Form.Item
                    name={['project_experiences', index, 'start_date']}
                    label="Start Date"
                    rules={[{ required: true, message: 'Please input month!' }]}
                    labelCol={{ span: 24 }}
                    style={{ marginBottom: 5 }}
                  >
                    <DatePicker format={dateFormat} />

                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    label="End Date"
                    name={['project_experiences', index, 'end_date']}
                    rules={[{ required: true, message: 'Please input year!' }]}
                    labelCol={{ span: 24 }}
                    style={{ marginBottom: 5 }}
                  >
                    <DatePicker format={dateFormat} />

                  </Form.Item>
                </Col>
                <Col span={7}>
                  <Form.Item
                    name={['project_experiences', index, 'current']}
                    labelCol={{ span: 24 }}
                    style={{ marginBottom: 5 }}
                  >
                    <Checkbox>I currently work in this Project</Checkbox>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col span={6}>
              <div style={{ display: 'flex' }} className='my-10 justify-end'>
                {index > 0 && <DeleteOutlined onClick={() => handleRemoveProjects(index)} className='text-blue-600 text-xl' />}
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
