'use client'

import React from 'react';
import { Button, Checkbox, Form, type FormProps, Input } from 'antd';
import { KeyOutlined, UserOutlined } from '@ant-design/icons';
import { login } from '@/app/api/auth/auth';
import { useAppDispatch } from '@/lib/hooks';
import { updateUsername } from '@/lib/features/userSlice';
import { useRouter } from 'next/navigation'
import { updateNotification } from '@/lib/features/notification';

type FieldType = {
  username?: string;
  password?: string;
  remember?: boolean;
};

const FormLogin: React.FC = () => {
  const router = useRouter()
  const dispatch = useAppDispatch();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    if (values.username && values.password) {
      const fetchLogin = await login({ username: values.username, password: values.password })
      if (fetchLogin.data?.username) {
        dispatch(updateUsername(fetchLogin?.username))
        router.push('/')
        dispatch(updateNotification({
          type: 'success',
          description: 'Logged in successfully'
        }))
      } else {
        dispatch(updateNotification({
          type: 'fail',
          description: fetchLogin.data
        }))
      }
    }
  };
  return (
    <Form
      name="login"
      style={{ width: "100%" }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
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
        <Button type='link' className='!text-primaryBlueDark hover:!text-primaryBlueMedium active:!text-primaryBlueDark'>Forget password?</Button>
      </div>

      <Form.Item style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
        <Button type="primary" style={{ borderRadius: '50px', paddingLeft: '60px', paddingRight: '60px' }} htmlType="submit" size="large">
          Sign in
        </Button>
      </Form.Item>
    </Form>
  )
};

export default FormLogin;