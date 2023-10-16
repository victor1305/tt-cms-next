'use client';

import React, { useState, useEffect } from 'react';

import { getPaymentsByUser } from '@/lib/https';
import {
  getMonthFormatted,
  numberToMonth
} from '@/lib/utils';

import { ProfileBox, PaymentsBox } from '@/components/molecules';

import 'react-datepicker/dist/react-datepicker.css';
import styles from './Profile.module.scss';

const Profile = ({ userPays, name, id }) => {
  const [startDatePayments, setStartDatePayments] = useState(new Date());
  const [payments, setPayments] = useState(userPays);

  const [isPaymentsLoading, setIsPaymentsLoading] = useState(false);
  const [isFirstPaymentsRender, setIsFirstPaymentsRender] = useState(true);


  const yearPayments = startDatePayments.getFullYear();
  const monthPayments = numberToMonth(startDatePayments.getMonth());

  useEffect(() => {
    const getNewPayments = async () => {
      setIsPaymentsLoading(true);
      const res = await getPaymentsByUser({
        id,
        year: startDatePayments.getFullYear(),
        monthFormated: getMonthFormatted(startDatePayments.getMonth())
      });
      setPayments(res);
      setIsPaymentsLoading(false);
    };
    !isFirstPaymentsRender && getNewPayments();
  }, [startDatePayments, isFirstPaymentsRender, id]);

  return (
    <div className={styles['profile']}>
      <h1>Mi Perfil</h1>
      <h2>Hola {name}!</h2>
      <div
        className={`${styles['profile__payments']} ${styles['profile__payments--first']}`}
      >
        <ProfileBox
          text1={`Previsión de pagos para ${monthPayments} ${yearPayments}`}
          text2="Si quieres ver los de otro mes, dale sin miedo!"
          startDate={startDatePayments}
          setStartDate={setStartDatePayments}
          setIsFirstRender={setIsFirstPaymentsRender}
        >
          <PaymentsBox
            {...{
              payments,
              monthPayments,
              yearPayments,
              isLoading: isPaymentsLoading
            }}
          />
        </ProfileBox>
      </div>
    </div>
  );
};

export default Profile;
