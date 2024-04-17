'use client'
import React from 'react';
import { Button, Form, type FormProps, Input, NotificationArgsProps } from 'antd';
import { KeyOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { useAppDispatch } from '@/lib/hooks';
import { updateUsername } from '@/lib/features/userSlice';
import { register } from '@/app/api/auth/auth';
import { useRouter } from 'next/navigation'
import { updateNotification } from '@/lib/features/notification';

type FieldType = {
  username?: string;
  password?: string;
  email?: string;
  rePassword?: string;
};

const FormRegister: React.FC = () => {
  const router = useRouter()
  const dispatch = useAppDispatch();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    if (values.username && values.password && values.email) {
      const fetchRegister = await register({ username: values.username, password: values.password, email: values.email })
      if (fetchRegister.data?.username) {
        dispatch(updateUsername(fetchRegister?.username))
        router.push('/')
        dispatch(updateNotification({
          type: 'success',
          description: 'Register in successfully'
        }))
      } else {
        dispatch(updateNotification({
          type: 'fail',
          description: fetchRegister.data
        }))
      }
    }
  };

  return (
    <Form
      name="register"
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
        name="email"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          { required: true, message: 'Please input your email!' }
        ]}
      >
        <Input placeholder="Email" style={{ borderRadius: '50px' }} size="large" prefix={<MailOutlined className='text-primaryBlueDark' style={{ marginLeft: '5px', marginRight: '5px' }} />} />
      </Form.Item>

      <Form.Item<FieldType>
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password placeholder="Password" style={{ borderRadius: '50px' }} size="large" prefix={<KeyOutlined className='text-primaryBlueDark' style={{ marginLeft: '5px', marginRight: '5px' }} />} />
      </Form.Item>

      <Form.Item<FieldType>
        name="rePassword"
        rules={[
          {
            required: true, message: 'Please input your re-password!'
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The new password that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password placeholder="Re-enter password" style={{ borderRadius: '50px' }} size="large" prefix={<KeyOutlined className='text-primaryBlueDark' style={{ marginLeft: '5px', marginRight: '5px' }} />} />
      </Form.Item>

      <Form.Item style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
        <Button type="primary" size='large' style={{ borderRadius: '50px', paddingLeft: '50px', paddingRight: '50px' }} htmlType="submit">
          Create Account
        </Button>
      </Form.Item>
    </Form>
  )
};

export default FormRegister;