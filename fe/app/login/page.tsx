'use client'

import React from 'react';
import type { MenuProps } from 'antd';
import { UnlockOutlined, UserAddOutlined } from '@ant-design/icons';
import dynamic from 'next/dynamic';
import Loading from './loading';

const FormLogin = dynamic(() => import('./components/FormLogin'), {
  loading: () => <Loading />,
  ssr: false,
});


const FormRegister = dynamic(() => import('./components/FormRegister'), {
  loading: () => <Loading />,
  ssr: false,
});

const Menu = dynamic(() => import('antd').then((antd) => antd.Menu), {
  loading: () => <Loading />,
  ssr: false,
});

const HeaderLogin = dynamic(() => import('./components/HeaderLogin'), {
  loading: () => <Loading />,
  ssr: false,
});

const FooterLogin = dynamic(() => import('./components/FooterLogin'), {
  loading: () => <Loading />,
  ssr: false,
});

export enum AuthMenu {
  LOGIN = 0,
  REGISTER = 1
}

export default function Login() {
  const [auth, setAuth] = React.useState<AuthMenu>(AuthMenu.LOGIN);

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
    setAuth(Number(e.key));
  };

  const renderBody = () => {
    switch (auth) {
      case AuthMenu.LOGIN:
        return <FormLogin />
      case AuthMenu.REGISTER:
        return <FormRegister />
    }
  }

  return (
    <main className="flex min-h-screen w-[100%] items-center justify-center bg-cover bg-center bg-primaryBlueLight from-transparent to-black">
      <div className="min-w-[600px] justify-center bg-primaryGrayLight rounded-xl shadow-2xl">
        <Menu onClick={onClick} style={{ display: 'flex', backgroundColor: 'transparent', borderTopLeftRadius: '0.75rem', borderTopRightRadius: '0.75rem' }} selectedKeys={[auth.toString()]} mode="horizontal" items={items} />
        <div className='flex flex-col my-[50px] mx-[100px] items-center justify-center text-primaryBlueDark'>
          <HeaderLogin title={auth === AuthMenu.LOGIN ? 'Login' : 'Register'} Component={auth === AuthMenu.LOGIN ? UnlockOutlined : UserAddOutlined} />
          {renderBody()}
          <FooterLogin />
        </div>
      </div>
    </main>
  );
}