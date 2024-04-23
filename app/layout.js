import { Krub, Allura } from 'next/font/google';

import { navbarPaths } from '@/lib/constants';

import { getUserData } from '@/app/api/user';

import { Header } from '@/components/molecules';

import '@/styles/globals.scss';

export const metadata = {
  title: 'CMS Turftiptster',
  description: 'Panel de gestión de Turftipster'
};

const krub = Krub({
  weight: ['200', '300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-krub'
});

const allura = Allura({
  weight: ['400'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-allura'
});

export default async function RootLayout({ children }) {
  const user = await getUserData();
  let paths = navbarPaths;
  if (user && user.data.role !== 'admin') {
    paths = paths.filter((elm) => !elm.to.toLowerCase().includes('client'));
  }

  return (
    <html lang="es" className={`${krub.variable} ${allura.variable}`}>
      <body>
        {user && <Header navbarPaths={paths} />}
        <div className="main">{children}</div>
      </body>
    </html>
  );
}
