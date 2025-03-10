import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import { Suspense } from 'react';
import MapLayout from '@/components/MapLayout';
import ReactQueryProvider from '@/components/common/ReactQueryProvider';
import AsideToggleProvider from '@/components/contexts/AsideToggleProvider';
import MapControllerProvider from '@/components/contexts/MapControllerProvider';
import PreferencesProvider from '@/components/contexts/PreferencesProvider';
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
            <PreferencesProvider>
              <AsideToggleProvider>
                <main className='flex h-svh flex-col md:flex-row-reverse'>
                  {/* FIXME: suspense fallback ui 추가 예정 */}
                  <Suspense>
                    <MapLayout />
                    {children}
                  </Suspense>
                </main>
              </AsideToggleProvider>
            </PreferencesProvider>
          </MapControllerProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
