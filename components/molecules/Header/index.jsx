'use client';

import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { DotLoader } from 'react-spinners';

import styles from './Header.module.scss';

const Header = ({ navbarPaths }) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showNavBar, setShowNavBar] = useState(pathname);
  const router = useRouter();
  const closeSesion = () => {
    Cookies.remove('token');
    router.push('/login');
  };

  const clickLink = (copy) => {
    setIsLoading(true);
    if (copy === 'Cerrar Sesión') {
      closeSesion();
    } else {
      setOpen(false);
    }
  };

  useEffect(() => {
    setShowNavBar(pathname);
    setIsLoading(false);
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

          {isLoading ? (
            <div className={styles['navbar__spinner']}>
              <DotLoader color={'#3860fb'} loading={isLoading} size={40} />
            </div>
          ) : (
            <ul
              className={`${styles['navbar__links']} ${
                open ? styles['navbar__links--active'] : ''
              }`}
            >
              {navbarPaths.map((elm, index) => (
                <li key={index} className={styles['navbar__item']}>
                  <Link
                    href={`${elm.to}${`?numb=${Math.random() * 100}`}`}
                    className={`${styles['navbar__link']} ${
                      pathname.includes(elm.to) && elm.to !== '/'
                        ? styles['navbar__link--active']
                        : ''
                    }`}
                    onClick={() => clickLink(elm.copy)}
                  >
                    {elm.copy}
                  </Link>
                </li>
              ))}
            </ul>
          )}

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
