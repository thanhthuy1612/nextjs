'use client'
import React from 'react';
import { Button, Checkbox, Form, type FormProps, Input } from 'antd';
import { KeyOutlined, UnlockOutlined, UserOutlined } from '@ant-design/icons';
import { login } from '@/app/api/auth';

type FieldType = {
  username?: string;
  password?: string;
  remember?: boolean;
};

const FormLogin: React.FC = () => {
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    if (values.username && values.password) {
      console.log({ username: values.username, password: values.password })
      const fetchLogin = await login({ username: values.username, password: values.password })
      console.log(fetchLogin)
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <>
      <div className='mb-[50px] flex items-center '>
        <UnlockOutlined className='text-primaryBlueDark border-primaryBlueDark border-[2px] p-[10px] rounded-[50%]' style={{ fontSize: '20px' }} />
        <p className='text-[40px] mx-[20px] text-primaryBlueDark'>LOGIN</p>
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
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder="Password" style={{ borderRadius: '50px' }} size="large" prefix={<KeyOutlined className='text-primaryBlueDark' style={{ marginLeft: '5px', marginRight: '5px' }} />} />
        </Form.Item>

        <div className='flex justify-between'>
          <Form.Item<FieldType>
            name="remember"
            valuePropName="checked"
          >
            <Checkbox className='text-primaryBlueDark'>Remember me</Checkbox>
          </Form.Item>
          <Button type='link' className='text-primaryBlueDark'>Forget password?</Button>
        </div>

        <Form.Item style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Button type="primary" style={{ borderRadius: '50px', paddingLeft: '60px', paddingRight: '60px' }} htmlType="submit" size="large">
            Sign in
          </Button>
        </Form.Item>
      </Form>
    </>
  )
};

export default FormLogin;