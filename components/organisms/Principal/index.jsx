'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { DotLoader } from 'react-spinners';

import styles from './Principal.module.scss';

const Principal = ({ menu }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className={styles['home-container']}>
      <div className={styles['home-container__login']}>
        <Image
          src="/LogoTT.png"
          width={140}
          height={105}
          alt="Logo TT"
          priority
        />
        <h4>
          CMS <span>TurfTipster</span>
        </h4>
      </div>

      {!isLoading ? (
        <div className={styles['home-container__buttons-container']}>
          {menu.map((elm, index) => (
            <div key={index}>
              <Link
                onClick={() => setIsLoading(true)}
                href={`${elm.to}${`?numb=${Math.random() * 100}`}`}
              >
                <button className="btn btn--primary">{elm.copy}</button>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="spinner-container">
          <DotLoader color={'#3860fb'} loading={isLoading} size={90} />
        </div>
      )}
      <div className={styles['margin-bottom-box']}></div>
    </div>
  );
};

export default Principal;
