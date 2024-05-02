import React from 'react';
import { Button, List } from "antd"
import { GoogleOutlined, GithubOutlined } from '@ant-design/icons';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { updateIsLoadingConnect } from '@/lib/features/login';


const FooterLogin: React.FC = () => {
  const { isLoadingConnect, isLoadingForm } = useAppSelector(state => state.login)
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const dispatch = useAppDispatch();

  const onClickButtonSignIn = async (type: string) => {
    dispatch(updateIsLoadingConnect(true))
    signIn(type, { callbackUrl })
  }

  const data = [
    {
      title: 'Continue with Google',
      icon: GoogleOutlined,
      className: 'w-[100%] bg-redPastel hover:!bg-redPastel active:!bg-redPastel',
      onclick: () => onClickButtonSignIn("google")
      // onclick: (event: any) => {
      //   event.preventDefault();
      //   window.location.href = `http://localhost:8000/auth/google/callback`;
      // }
    },
    {
      title: 'Continue with Github',
      icon: GithubOutlined,
      className: 'w-[100%] bg-primaryBlack hover:!bg-primaryBlack active:!bg-primaryBlack',
      onclick: () => onClickButtonSignIn("github")
    },
    // {
    //   title: 'Continue with Facebook',
    //   icon: FacebookOutlined,
    //   className: 'w-[100%] bg-blueDarkPastel hover:!bg-blueDarkPastel active:!bg-blueDarkPastel',
    //   onclick: () => signIn("facebook", { callbackUrl })
    // }
  ]

  return (
    <div className='w-[100%] mt-[10px]'>
      <div className='flex w-[100%] justify-between items-center'>
        <div className='border-b-[2px] h-[0px] border-primaryBlueDark basis-[45%]'></div>
        <div className='w-[100%] basis-[10%] flex justify-center'>OR</div>
        <div className='border-b-[2px] h-[0px] border-primaryBlueDark basis-[45%]'></div>
      </div>
      <List
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Button size='large'
              type='primary'
              className={item.className}
              icon={<item.icon className='mx-[5px]' />}
              onClick={item.onclick}
              disabled={isLoadingConnect || isLoadingForm}
            >
              {item.title}
            </Button>
          </List.Item>
        )}
      />
    </div>
  )
}
export default FooterLogin