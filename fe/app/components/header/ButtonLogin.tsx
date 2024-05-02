'use client'

import React from 'react';
import { Avatar, Button, Dropdown } from 'antd';
import { useRouter } from 'next/navigation';
import { BellOutlined, HomeOutlined, LoginOutlined, LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { useAppSelector } from '@/lib/hooks';

const ButtonLogo: React.FC = async () => {
  const { username } = useAppSelector(state => state.user)
  const [isDisable, setIsDisable] = React.useState<boolean>(false)
  const router = useRouter()

  const items = [
    {
      key: '1',
      label: username,
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
      {!username ?
        <Button
          icon={<LoginOutlined />}
          disabled={isDisable}
          onClick={onClickLogin}
          className=' ring-primaryBlue ring-offset-2 ring m-[10px]'
        >
          Login
        </Button> :
        <Dropdown menu={{ items, style: { minWidth: '200px', backgroundColor: '#FBF9F1' } }} arrow>
          <Avatar
            className=' bg-primaryWhite text-primaryBlueDark m-[10px] ring-primaryBlue ring-offset-2 ring'
            icon={<UserOutlined />} />
        </Dropdown>
      }
    </div>
  );
}
export default ButtonLogo
