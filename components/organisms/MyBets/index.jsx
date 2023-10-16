'use client';

import React, { useState, useEffect } from 'react';

import { headersBalanceTable } from '@/lib/constants';
import { getPersonalBetsByMonth } from '@/lib/https';
import {
  getDataFormatted,
  getMonthFormatted,
  numberToMonth
} from '@/lib/utils';

import { MonthlyPlanner } from '@/components/atoms';
import {
  BalancesTable,
  BtnsBox,
  PersonalBet,
  ProfileBox
} from '@/components/molecules';

import 'react-datepicker/dist/react-datepicker.css';
import styles from './MyBets.module.scss';

const MyBets = ({ betsData, id, token }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [isModalBetOpen, setIsModalBetOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [data, setData] = useState(
    getDataFormatted(betsData.personalBetsList, startDate)
  );
  const [dataByBookie, setDataByBookies] = useState(betsData.balances);
  const [yearDataByBookie, setYearDataByBookies] = useState(
    betsData.yearBalances
  );

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

  const formSubmitted = () => {
    setIsModalBetOpen(false);
    reloadBets();
  };

  const reloadBets = async () => {
    setIsLoading(true);
    const res = await getPersonalBetsByMonth({
      id,
      year: startDate.getFullYear(),
      month: startDate.getMonth(),
      token
    });
    const dataFormatted = getDataFormatted(res.personalBetsList, startDate);
    setData(dataFormatted);
    setDataByBookies(res.balances);
    setYearDataByBookies(res.yearBalances);
    setIsLoading(false);
  };

  useEffect(() => {
    const getNewBets = async () => {
      setIsLoading(true);
      const res = await getPersonalBetsByMonth({
        id,
        year: startDate.getFullYear(),
        month: startDate.getMonth(),
        token
      });
      setData(getDataFormatted(res.personalBetsList, startDate));
      setDataByBookies(res.balances);
      setYearDataByBookies(res.yearBalances);
      setIsLoading(false);
    };

    !isFirstRender && getNewBets();
  }, [startDate, isFirstRender, id, token]);

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
      <div
        className={`${styles['my-bets__payments']} ${styles['my-bets__payments--last']}`}
      >
        <ProfileBox text1="Balances por año, mes y bookie">
          <div className={styles['my-bets__payments__tables-container']}>
            <div className={styles['my-bets__payments__table-box']}>
              <h4>
                Balances de {month} de {year}
              </h4>
              <BalancesTable
                headerArr={headersBalanceTable}
                bodyArr={dataByBookie}
                hasTotal={true}
              />
            </div>
            <div className={styles['my-bets__payments__table-box']}>
              <h4>Balances de {year}</h4>
              <BalancesTable
                headerArr={headersBalanceTable}
                bodyArr={yearDataByBookie}
                hasTotal={true}
              />
            </div>
          </div>
        </ProfileBox>
      </div>
      <PersonalBet
        formData={{}}
        handleClose={() => setIsModalBetOpen(false)}
        isEdit={false}
        show={isModalBetOpen}
        {...{ token, id, formSubmitted }}
      />
    </div>
  );
};

export default MyBets;
