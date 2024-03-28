'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

import { navbarPaths } from '@/lib/constants';

import styles from './Header.module.scss';

const Header = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [showNavBar, setShowNavBar] = useState(pathname);
  const router = useRouter();
  const closeSesion = () => {
    try {
      document.cookie = 'token=;Path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    } catch (e) {
      console.log(
        'removeCookie: Error al borrar la cookie: ' + JSON.stringify(e)
      );
    }

    router.push('/login');
  };

  useEffect(() => {
    setShowNavBar(pathname);
  }, [pathname]);

  return (
    <>
      {showNavBar !== '/login' ? (
        <nav className={styles['navbar']}>
          <Link
            href={'/'}
            className={`${styles['navbar__logo']} ${
              pathname === '/' ? styles['navbar__link--active'] : ''
            }`}
          >
            TurfTipster
          </Link>

          <ul
            className={`${styles['navbar__links']} ${
              open ? styles['navbar__links--active'] : ''
            }`}
          >
            {navbarPaths.map((elm, index) => (
              <li key={index} className={styles['navbar__item']}>
                <Link
                  href={`${elm.to}${
                    !elm.to.includes('cuadrantes')
                      ? `?numb=${Math.random() * 100}`
                      : ''
                  }`}
                  className={`${styles['navbar__link']} ${
                    pathname.includes(elm.to) && elm.to !== '/'
                      ? styles['navbar__link--active']
                      : ''
                  }`}
                  onClick={
                    elm.copy === 'Cerrar Sesión'
                      ? closeSesion
                      : () => setOpen(false)
                  }
                >
                  {elm.copy}
                </Link>
              </li>
            ))}
          </ul>
          <div
            onClick={() => setOpen(!open)}
            className={styles['navbar__icon']}
          >
            {open ? <FiX /> : <FiMenu />}
          </div>
        </nav>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default Header;
