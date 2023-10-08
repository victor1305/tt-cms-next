'use client';

import React, { useState, useEffect } from 'react';

import { dayPlannerMapping } from '@/lib/constants';
import { getPaymentsByUser } from '@/lib/https';
import { getMonthFormatted, numberToMonth } from '@/lib/utils';

import { MonthlyPlanner } from '@/components/atoms';
import { ProfileBox, PaymentsBox } from '@/components/molecules';

import 'react-datepicker/dist/react-datepicker.css';
import styles from './Profile.module.scss';

const Profile = ({ userPays, name, id, betsByMonth }) => {
  const [payments, setPayments] = useState(userPays);
  const [bets, setbets] = useState(betsByMonth);

  const [startDatePayments, setStartDatePayments] = useState(new Date());
  const [startDateBets, setStartDateBets] = useState(new Date());

  const [isPaymentsLoading, setIsPaymentsLoading] = useState(false);
  const [isFirstPaymentsRender, setIsFirstPaymentsRender] = useState(true);
  const [isBetsLoading, setIsBetsLoading] = useState(false);
  const [isFirstBetsRender, setIsFirstBetsRender] = useState(true);

  const yearPayments = startDatePayments.getFullYear();
  const monthPayments = numberToMonth(startDatePayments.getMonth());

  const yearBets = startDateBets.getFullYear();
  const monthBets = numberToMonth(startDateBets.getMonth());

  const dateFormated = `${yearBets}-${
    startDateBets.getMonth() + 1 < 10
      ? `0${startDateBets.getMonth() + 1}`
      : startDateBets.getMonth() + 1
  }-01 05:00:22`;
  const beginingDay = new Date(dateFormated).getDay();
  const day = dayPlannerMapping[beginingDay];

  const calculateNumberDaysOnMonth = () => {
    const monthNumberDays = new Date(
      yearBets,
      startDateBets.getMonth() + 1,
      0
    ).getDate();
    const months = [];
    for (let i = day; i <= monthNumberDays; i++) {
      months.push(i);
    }

    return months;
  };

  const dataFormated = () => {
    const arrayDays = [];
    for (let i = 1; i <= calculateNumberDaysOnMonth().length; i++) {
      const dayData = bets.filter(
        (elm) =>
          new Date(elm.date) >
            new Date(
              `${yearBets}-${
                startDateBets.getMonth() + 1 < 10
                  ? `0${startDateBets.getMonth() + 1}`
                  : startDateBets.getMonth() + 1
              }-${i < 10 ? `0${i}` : i}T00:00:00.951+00:00`
            ) &&
          new Date(elm.date) <
            new Date(
              `${yearBets}-${
                startDateBets.getMonth() + 1 < 10
                  ? `0${startDateBets.getMonth() + 1}`
                  : startDateBets.getMonth() + 1
              }-${i < 10 ? `0${i}` : i}T23:59:59.951+00:00`
            )
      );
      arrayDays.push(dayData);
    }
    return arrayDays;
  };

  useEffect(() => {
    const getNewBets = async () => {
      setIsBetsLoading(true);
      const res = await getPaymentsByUser({
        id,
        year: startDateBets.getFullYear(),
        monthFormated: getMonthFormatted(startDateBets.getMonth())
      });
      setbets(res);
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
              beginingDay={beginingDay}
              monthDays={calculateNumberDaysOnMonth()}
              data={dataFormated()}
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
