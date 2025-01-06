import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import NavigationBar from '@/components/NavigationBar';
import ReactQueryProvider from '@/components/ReactQueryProvider';
import SearchedStoreList from '@/components/SearchedStoreList';
import SearchInputField from '@/components/common/SearchInputField';
import MapControllerProvider from '@/components/maps/MapControllerProvider';
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
          <MapControllerProvider>
            <main className='flex h-svh flex-col'>
              <SearchInputField />
              <MapView />
              <SearchedStoreList />
              <NavigationBar />
              {children}
            </main>
          </MapControllerProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
