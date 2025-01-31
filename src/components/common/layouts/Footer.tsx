import Link from 'next/link';
import React from 'react';

function Footer() {
  return (
    <footer className='bg-gray-200 p-4 shadow-500'>
      <table className='mb-[10px] border-separate border-spacing-y-2'>
        <tbody className='text-left text-caption-1 text-gray-600'>
          <tr>
            <th className='w-[30%] font-normal'>개발자</th>
            <td className='w-[70%] font-normal'>윤우상</td>
          </tr>
          <tr>
            <th className='w-[30%] font-normal'>이메일</th>
            <td className='w-[70%] font-normal'>woosang043@gmail.com</td>
          </tr>
          <tr>
            <th className='w-[30%] font-normal'>Github</th>
            <td className='w-[70%] font-normal'>
              <Link
                href='https://github.com/yws1502/canipay-fe'
                className='underline'
                target='_blank'
              >
                https://github.com/yws1502/canipay-fe
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
      <strong className='text-heading-3 text-gray-500'>Can I Pay</strong>
    </footer>
  );
}

export default Footer;
