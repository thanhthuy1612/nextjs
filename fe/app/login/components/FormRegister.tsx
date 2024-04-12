'use client'
import React from 'react';
import { Button, Form, type FormProps, Input } from 'antd';
import { KeyOutlined, MailOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';

type FieldType = {
  username?: string;
  password?: string;
  email?: string;
  rePassword?: string;
};

const FormRegister: React.FC = () => {
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <>
      <div className='mb-[50px] flex items-center'>
        <UserAddOutlined className='text-primaryBlueDark border-primaryBlueDark border-[2px] p-[10px] rounded-[50%]' style={{ fontSize: '20px' }} />
        <p className='text-[40px] mx-[20px] text-primaryBlueDark'>REGISTER</p>
      </div>
      <Form
        name="login"
        style={{ width: "100%" }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input placeholder="Username" style={{ borderRadius: '50px' }} size="large" prefix={<UserOutlined className='text-primaryBlueDark' style={{ marginLeft: '5px', marginRight: '5px' }} />} />
        </Form.Item>

        <Form.Item<FieldType>
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input placeholder="Email" style={{ borderRadius: '50px' }} size="large" prefix={<MailOutlined className='text-primaryBlueDark'  style={{ marginLeft: '5px', marginRight: '5px' }} />} />
        </Form.Item>

        <Form.Item<FieldType>
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder="Password" style={{ borderRadius: '50px' }} size="large" prefix={<KeyOutlined className='text-primaryBlueDark' style={{ marginLeft: '5px', marginRight: '5px' }} />} />
        </Form.Item>

        <Form.Item<FieldType>
          name="rePassword"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder="Re-enter password" style={{ borderRadius: '50px' }} size="large" prefix={<KeyOutlined className='text-primaryBlueDark' style={{ marginLeft: '5px', marginRight: '5px' }} />} />
        </Form.Item>

        <Form.Item style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
          <Button type="primary" style={{ borderRadius: '50px', paddingLeft: '50px', paddingRight: '50px' }} htmlType="submit" size="large">
            Create Account
          </Button>
        </Form.Item>
      </Form>
    </>
  )
};

export default FormRegister;