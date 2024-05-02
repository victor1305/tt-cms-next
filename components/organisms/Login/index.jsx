'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import DotLoader from 'react-spinners/DotLoader';

import { loginUser } from '@/lib/https';

import styles from './Login.module.scss';

const Login = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, updateErrorMsg] = useState('');
  const [userState, setUserState] = useState({
    username: '',
    password: ''
  });

  const login = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const data = await loginUser(userState);
      document.cookie = `token=${data.token};path=/`; 
      router.push('/'); 
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      updateErrorMsg(
        error.response && error.response.data && error.response.data.error
          ? error.response.data.error
          : 'Hubo un error al conectar con la Base de Datos'
      );
    }
  };

  return (
    <div>
      {isLoading ? (
        <div className="spinner-container">
          <DotLoader color={'#3860fb'} loading={isLoading} size={90} />
        </div>
      ) : (
        <div className={styles['login']}>
          <div className={styles['login__title-container']}>
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
          <div className={styles['login__form-container']}>
            <p className={styles['login__form-container__title']}>
              Iniciar Sesión
            </p>
            <form onSubmit={login}>
              <div className={styles['login__form-container__form']}>
                <label
                  className={styles['login__form-container__form--label1']}
                >
                  Usuario
                </label>
                <input
                  className={styles['login__form-container__form--input1']}
                  type="text"
                  name="username"
                  onChange={(e) =>
                    setUserState({ ...userState, username: e.target.value })
                  }
                />

                <label
                  className={styles['login__form-container__form--label2']}
                >
                  Contraseña
                </label>
                <input
                  className={styles['login__form-container__form--input2']}
                  type="password"
                  name="password"
                  onChange={(e) =>
                    setUserState({ ...userState, password: e.target.value })
                  }
                />
              </div>

              {errorMsg && (
                <div className="login-error">
                  <p className={styles['login__form-container__form--error']}>
                    {errorMsg}
                  </p>
                </div>
              )}

              <div
                className={styles['login__form-container__form--btn-container']}
              >
                <button className="btn btn--primary" type="submit">
                  Entrar
                </button>
              </div>
            </form>
          </div>
          <div className="margin-bottom-box"></div>
        </div>
      )}
    </div>
  );
};

export default Login;
