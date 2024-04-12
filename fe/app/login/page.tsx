'use client'
import React from 'react';
import FormLogin from "./components/FormLogin";
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { UnlockOutlined, UserAddOutlined } from '@ant-design/icons';
import FormRegister from './components/FormRegister';

enum AuthMenu {
  LOGIN = 0,
  REGISTER = 1
}

export default function Login() {
  const [current, setCurrent] = React.useState<AuthMenu>(AuthMenu.LOGIN);

  const items: MenuProps['items'] = [
    {
      label: 'Login',
      key: AuthMenu.LOGIN,
      icon: <UnlockOutlined />,
      style: {
        flexBasis: '50%',
        borderTopLeftRadius: '0.75rem',
      },
    },
    {
      label: 'Register',
      key: AuthMenu.REGISTER,
      icon: <UserAddOutlined />,
      style: {
        flexBasis: '50%',
        borderTopRightRadius: '0.75rem',
      },
    },
  ];

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(Number(e.key));
  };

  const renderBody = () => {
    switch (current) {
      case AuthMenu.LOGIN:
        return <FormLogin />
      case AuthMenu.REGISTER:
        return <FormRegister />
    }
  }

  return (
    <main className="flex min-h-screen w-[100%] items-center justify-center bg-cover bg-center bg-primaryBlueLight from-transparent to-black">
      <div className="min-w-[600px] justify-center bg-primaryGrayLight rounded-xl">
        <Menu onClick={onClick} style={{ display: 'flex', backgroundColor: 'transparent', borderTopLeftRadius: '0.75rem', borderTopRightRadius: '0.75rem' }} selectedKeys={[current.toString()]} mode="horizontal" items={items} />
        <div className='flex flex-col my-[50px] mx-[100px] items-center justify-center text-primaryBlueDark'>
          {renderBody()}
        </div>
      </div>
    </main>
  );
}