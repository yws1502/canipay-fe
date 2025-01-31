import React from 'react';
import Footer from '@/components/common/layouts/Footer';
import Header from '@/components/common/layouts/Header';

function SettingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='fixed inset-0 z-30 flex flex-col overflow-auto bg-white'>
      <Header />
      <section className='flex-1 overflow-auto p-4'>{children}</section>
      <Footer />
    </div>
  );
}

export default SettingLayout;
