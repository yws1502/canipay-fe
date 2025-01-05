import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import NavigationBar from '@/components/NavigationBar';
import ReactQueryProvider from '@/components/ReactQueryProvider';
import SearchedList from '@/components/SearchedList';
import SearchInputField from '@/components/common/SearchInputField';
import MapView from '@/components/maps/MapView';
import './globals.css';
import './tailwind.css';

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'Can I Pay',
  description: '복지 카드로 결제 가능한 매장 시각화 서비스',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${notoSansKr.className} antialiased`}>
        <ReactQueryProvider>
          <main className='flex h-svh flex-col'>
            <SearchInputField />
            <MapView />
            <SearchedList />
            <NavigationBar />
            {children}
          </main>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
