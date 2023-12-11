'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';

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
  const [data, setData] = useState(
    getDataFormatted(betsData?.personalBetsList, startDate)
  );
  const [dataByBookie, setDataByBookies] = useState(betsData?.balances);
  const [yearDataByBookie, setYearDataByBookies] = useState(
    betsData?.yearBalances
  );

  const year = startDate.getFullYear();
  const month = numberToMonth(startDate.getMonth());

  const isFirstRenderRef = useRef(true);

  const btnsList = [
    {
      copy: 'Agregar balance',
      handleClick: () => setIsModalBetOpen(true)
    }
  ];

  const formSubmitted = () => {
    setIsModalBetOpen(false);
    reloadBets();
  };

  const reloadBets = useCallback(async () => {
    setIsLoading(true);
    const res = await getPersonalBetsByMonth({
      id,
      year,
      month: startDate.getMonth(),
      token
    });
    if (res.balances && res.personalBetsList && res.yearBalances) {
      setData(getDataFormatted(res.personalBetsList, startDate));
      setDataByBookies(res.balances);
      setYearDataByBookies(res.yearBalances);
    }
    setIsLoading(false);
  }, [id, token, startDate, year]);

  useEffect(() => {
    if (!isFirstRenderRef.current) {
      reloadBets();
    } else {
      isFirstRenderRef.current = false;
    }
  }, [startDate, reloadBets]);

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
