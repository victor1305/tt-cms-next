'use client';

import React, { useState, useEffect } from 'react';

import { getPersonalBetsByMonth } from '@/lib/https';
import {
  getDataFormatted,
  getMonthFormatted,
  numberToMonth
} from '@/lib/utils';

import { MonthlyPlanner } from '@/components/atoms';
import { BtnsBox, PersonalBet, ProfileBox } from '@/components/molecules';

import 'react-datepicker/dist/react-datepicker.css';
import styles from './MyBets.module.scss';

const MyBets = ({ balances, id, token }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [isModalBetOpen, setIsModalBetOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [data, setData] = useState(getDataFormatted(balances, startDate));

  const year = startDate.getFullYear();
  const month = numberToMonth(startDate.getMonth());

  const openModal = () => {
    setIsModalBetOpen(true);
  };

  const btnsList = [
    {
      copy: 'Agregar balance',
      handleClick: openModal
    }
  ];

  useEffect(() => {
    const getNewBets = async () => {
      setIsLoading(true);
      const res = await getPersonalBetsByMonth({
        id,
        year: startDate.getFullYear(),
        month: startDate.getMonth()
      });
      setData(getDataFormatted(res, startDate));
      setIsLoading(false);
    };

    !isFirstRender && getNewBets();
  }, [startDate, isFirstRender, id]);

  return (
    <div className={styles['my-bets']}>
      <h1>Mis Balances</h1>
      <BtnsBox {...{ btnsList, justify: 'flex-end', width: '1100px' }} />
      <div
        className={`${styles['my-bets__payments']} ${styles['my-bets__payments--first']}`}
      >
        <ProfileBox
          text1={`Balances de ${month} ${year}`}
          text2="Puedes ver los de cualquier mes!"
          startDate={startDate}
          setStartDate={setStartDate}
          setIsFirstRender={setIsFirstRender}
        >
          <MonthlyPlanner
            isLoading={isLoading}
            monthDays={data.monthDays}
            data={data.dataByDay}
            monthSelected={getMonthFormatted(startDate.getMonth())}
            yearSelected={year}
            type={'my-bets'}
          />
        </ProfileBox>
      </div>
      <PersonalBet
        formData={{}}
        handleClose={() => setIsModalBetOpen(false)}
        isEdit={false}
        show={isModalBetOpen}
        {...{ token, id }}
      />
    </div>
  );
};

export default MyBets;
