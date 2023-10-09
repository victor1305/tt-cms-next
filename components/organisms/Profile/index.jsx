'use client';

import React, { useState, useEffect } from 'react';

import { getBetsByMonth, getPaymentsByUser } from '@/lib/https';
import {
  getDataFormatted,
  getMonthFormatted,
  numberToMonth
} from '@/lib/utils';

import { MonthlyPlanner } from '@/components/atoms';
import { ProfileBox, PaymentsBox } from '@/components/molecules';

import 'react-datepicker/dist/react-datepicker.css';
import styles from './Profile.module.scss';

const Profile = ({ userPays, name, id, betsByMonth }) => {
  const [startDatePayments, setStartDatePayments] = useState(new Date());
  const [startDateBets, setStartDateBets] = useState(new Date());
  const [payments, setPayments] = useState(userPays);
  const [data, setData] = useState(
    getDataFormatted(betsByMonth, startDateBets)
  );
  const [isPaymentsLoading, setIsPaymentsLoading] = useState(false);
  const [isFirstPaymentsRender, setIsFirstPaymentsRender] = useState(true);
  const [isBetsLoading, setIsBetsLoading] = useState(false);
  const [isFirstBetsRender, setIsFirstBetsRender] = useState(true);

  const yearPayments = startDatePayments.getFullYear();
  const monthPayments = numberToMonth(startDatePayments.getMonth());

  const yearBets = startDateBets.getFullYear();
  const monthBets = numberToMonth(startDateBets.getMonth());

  useEffect(() => {
    const getNewBets = async () => {
      setIsBetsLoading(true);
      const res = await getBetsByMonth({
        id,
        year: startDateBets.getFullYear(),
        month: startDateBets.getMonth()
      });
      setData(getDataFormatted(res, startDateBets));
      setIsBetsLoading(false);
    };

    !isFirstBetsRender && getNewBets();
  }, [startDateBets, isFirstBetsRender, id]);

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
      <div className={styles['profile__payments']}>
        <ProfileBox
          text1={`Resumen de apuestas de ${monthBets} ${yearBets}`}
          text2="Puedes ver las de otros meses!"
          startDate={startDateBets}
          setStartDate={setStartDateBets}
          setIsFirstRender={setIsFirstBetsRender}
        />
        <>
          {payments.length ? (
            <MonthlyPlanner
              isLoading={isBetsLoading}
              monthDays={data.monthDays}
              data={data.dataByDay}
              monthSelected={getMonthFormatted(startDateBets.getMonth())}
              yearSelected={yearBets}
            />
          ) : (
            <p className={styles['profile__payments__no-payments']}>
              No hay pagos que mostrar para {`${monthBets}-${yearBets}`}
            </p>
          )}
        </>
      </div>
    </div>
  );
};

export default Profile;
