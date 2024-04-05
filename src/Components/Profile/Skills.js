import React, { useCallback, useState, useEffect } from 'react';
import { Button, Form, Row, Col, Rate, Card, Select } from 'antd';
import { Delete03Icon, StarIcon, PlusSignCircleIcon } from 'hugeicons-react';

export default function Skills({ skillsSet, skills_data, handleSetProfile, setCurrent, current }) {
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
      <Row gutter={[16]}>
        <Col xs={24} sm={24} md={24} lg={24}>
          <div>
            <h2 className='text-gray-700 text-3xl my-2'>Skills</h2>
            <p className='text-gray-500 text-lg mb-6'>Time to showcase your skills and expertis</p>
          </div>
        </Col>
      </Row>
      <Card>

        <Row gutter={[16, 16]} className='my-2'>
          {skills.map((job, index) => (
            <Col span={12}>
              <Row>
                <Col span={11} >
                  <Form.Item
                    name={['skills', index, 'name']}
                    rules={[{ required: true, message: 'Please select skills!' }]}
                    labelCol={{ span: 24 }}
                    style={{ marginBottom: 5 }}
                  >
                    <Select
                      placeholder='Select skills'
                      size='large'
                      showSearch
                      allowClear
                      options={skillsSet.map((skill) => ({ label: skill.name, value: skill.name }))}
                    />
                  </Form.Item>
                </Col>
                <Col span={10} push={1} >
                  <Form.Item
                    name={['skills', index, 'rating']}
                    rules={[{ required: true, message: 'Please select rating!' }]}
                    labelCol={{ span: 24 }}
                    style={{ marginBottom: 5 }}
                  >
                    <Rate character={<StarIcon fill='#eee' />} />
                  </Form.Item>
                </Col>

                <Col span={2}>
                  <div style={{ display: 'flex' }} className='justify-start items-center cursor-pointer'>
                    {index > 0 && <Delete03Icon
                      size={20}
                      color={"#FF4D4F"}
                      variant={"stroke"}
                      onClick={() => handleRemoveSkills(index)} />}
                  </div>
                </Col>
              </Row>
            </Col>))}
        </Row >

        <span onClick={() => handleAddSkills()} className='text-orange-400 w-32 flex items-center gap-2 text-lg cursor-pointer mt-2'> <PlusSignCircleIcon size={20} /> Add Skill</span>
      </Card >
      <Row>
        <Col span={24}>
          <div className='flex items-center justify-between w-full mt-6'>
            <Button
              style={{ padding: '0px 30px' }}
              className="md:w-auto md:justify-end"
              size='large'
              onClick={() => setCurrent(current - 1)}
            >
              Back
            </Button>

            <Button
              style={{ padding: '0px 30px' }}
              className="md:w-auto md:justify-end"
              size='large'
              type="primary"
              htmlType="submit"
            >
              Next
            </Button>
          </div>
        </Col>
      </Row >
    </Form >
  );
}
