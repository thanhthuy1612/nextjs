'use client'

import React from 'react';
import Loading from './Loading';
import dynamic from 'next/dynamic';

const Logo = dynamic(() => import('./Logo'), {
  loading: () => <Loading />,
  ssr: false,
});

const ButtonLogo = dynamic(() => import('./ButtonLogin'), {
  loading: () => <Loading />,
  ssr: false,
});

const Header: React.FC = () => {
  return (
    <header className="w-[100%] px-[20px] h-[60px] flex items-center bg-gradient-to-r from-primaryBlueDark to-primaryBlueLight justify-between">
      <Logo />
      <ButtonLogo />
    </header>
  );
}
export default Header