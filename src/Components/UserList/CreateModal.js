import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Input, Row, Col } from 'antd';

const CreateModal = ({ open, handleCancel, skills }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values, "skills--");
    setConfirmLoading(true);
    setTimeout(() => {
      handleCancel();
      setConfirmLoading(false);
    }, 1000);

  };

  useEffect(() => {
    if (skills && Object.keys(skills).length !== 0) {
      console.log(skills, "skillsskillsskills", skills.name)
      form.setFieldsValue({ id: skills.id, name: skills.name });
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
                { required: true, message: 'Please input your suite name!' },
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
