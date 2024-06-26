'use client'

import React from 'react';
import { Avatar, Button, Dropdown, MenuProps } from 'antd';
import { useRouter } from 'next/navigation';
import { BellOutlined, HomeOutlined, LoginOutlined, LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { signOut } from 'next-auth/react';

const ButtonLogo: React.FC = () => {
  const [isDisable, setIsDisable] = React.useState<boolean>(false)
  const router = useRouter()
  const user = JSON.parse((localStorage.getItem('user') ?? '{}').toString());

  const onClickLogout = () => {
    localStorage.clear();
    signOut()
  }

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    switch (e.key) {
      case '4':
        onClickLogout();
        break;
    }
  };

  const items = [
    {
      key: '1',
      label: user.username,
      icon: <HomeOutlined />
    },
    {
      key: '2',
      label: 'Notification',
      icon: <BellOutlined />
    },
    {
      key: '3',
      label: 'Settings',
      icon: <SettingOutlined />
    },
    {
      key: '4',
      label: 'Logout',
      icon: <LogoutOutlined />
    },
  ];

  const onClickLogin = () => {
    setIsDisable(true)
    router.push('/login')
  }

  return (
    <div className='flex items-center'>
      {!user.username ?
        <Button
          icon={<LoginOutlined />}
          disabled={isDisable}
          onClick={onClickLogin}
          className=' ring-primaryBlue ring-offset-2 ring m-[10px]'
        >
          Login
        </Button> :
        <Dropdown menu={{ items, onClick: handleMenuClick, style: { minWidth: '200px', backgroundColor: '#FBF9F1' } }} arrow>
          <Avatar
            className=' bg-primaryWhite text-primaryBlueDark m-[10px] ring-primaryBlue ring-offset-2 ring'
            icon={<UserOutlined />} />
        </Dropdown>
      }
    </div>
  );
}
export default ButtonLogo
