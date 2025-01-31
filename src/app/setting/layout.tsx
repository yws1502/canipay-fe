import React from 'react';

function SettingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className='fixed inset-0 z-30 overflow-auto bg-white'>{children}</div>;
}

export default SettingLayout;
