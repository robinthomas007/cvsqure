import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Input, Row, Col } from 'antd';
import axios from './../../Api/axios'

const CreateModal = ({ open, handleCancel, skills, fetchSkills }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values)
    setConfirmLoading(true);
    setTimeout(() => {
      handleCancel();
      setConfirmLoading(false);
    }, 1000);

    if (skills.ID) {
      axios.put(`${process.env.REACT_APP_BASE_URL}/api/admin/skill/${skills.ID}`, values)
        .then(response => {
          if (response)
            fetchSkills()
        })
        .catch(error => {
          console.error('Error creating skills:', error);
        });
    } else {
      axios.post(`${process.env.REACT_APP_BASE_URL}/api/admin/skill`, values)
        .then(response => {
          if (response)
            fetchSkills()
        })
        .catch(error => {
          console.error('Error creating skills:', error);
        });
    }
  };

  useEffect(() => {
    if (skills && Object.keys(skills).length !== 0) {
      console.log(skills, "skillsskillsskills", skills.name)
      form.setFieldsValue({ id: skills.ID, name: skills.name });
    }
  }, [skills]);

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Modal
      title="Create Skills"
      open={open}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      destroyOnClose
      footer={[
        <Button form="createSkills" key="submit" htmlType="submit" type="primary">
          Save
        </Button>,
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
      ]}
    >
      <Row justify="start">
        <Col span={24}>
          <Form
            name="createSkills"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            form={form}
            preserve={false}
          >
            <Form.Item
              label="Skill Name"
              name="name"
              labelCol={{ span: 24 }}
              rules={[
                { required: true, message: 'Please input your skill name!' },
                { min: 2, message: 'Field must be minimum 2 characters.' }
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Modal>
  );
};

export default CreateModal;
