'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';

import { getBetsByMonth } from '@/lib/https';
import {
  getDataFormatted,
  getMonthFormatted,
  numberToMonth
} from '@/lib/utils';

import { MonthlyPlanner } from '@/components/atoms';
import {
  BtnsBox,
  PersonalBet,
  ProfileBox
} from '@/components/molecules';

import 'react-datepicker/dist/react-datepicker.css';
import styles from './Bets.module.scss';

const Bets = ({ betsData }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [isModalBetOpen, setIsModalBetOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(
    getDataFormatted(betsData, startDate)
  );

  const year = startDate.getFullYear();
  const month = numberToMonth(startDate.getMonth());

  const isFirstRenderRef = useRef(true);

  const btnsList = [
    {
      copy: 'Añadir Parámetro',
      handleClick: () => setIsModalBetOpen(true)
    },
    {
      copy: 'Ver Apuestas',
      handleClick: () => setIsModalBetOpen(true)
    },
    {
      copy: 'Añadir Apuesta',
      handleClick: () => setIsModalBetOpen(true)
    }
  ];

  const formSubmitted = () => {
    setIsModalBetOpen(false);
    reloadBets();
  };

  const reloadBets = useCallback(async () => {
    setIsLoading(true);
    const res = await getBetsByMonth({
      year,
      month: startDate.getMonth(),
    });
    if (res) {
      setData(getDataFormatted(res, startDate));
    }
    setIsLoading(false);
  }, [startDate, year]);

  useEffect(() => {
    if (!isFirstRenderRef.current) {
      reloadBets();
    } else {
      isFirstRenderRef.current = false;
    }
  }, [startDate, reloadBets]);

  return (
    <div className={styles['bets']}>
      <h1>Gestión de Apuestas</h1>
      <BtnsBox {...{ btnsList, justify: 'space-evenly', width: '1100px' }} />
      <div
        className={`${styles['bets__payments']} ${styles['bets__payments--first']}`}
      >
        <ProfileBox
          text1={`Fecha: ${month} ${year}`}
          text2="Selecciona otro mes:"
          startDate={startDate}
          setStartDate={setStartDate}
        >
          <MonthlyPlanner
            isLoading={isLoading}
            monthDays={data.monthDays}
            data={data.dataByDay}
            monthSelected={getMonthFormatted(startDate.getMonth())}
            yearSelected={year}
            type={'bets'}
          />
        </ProfileBox>
      </div>
      {/* <PersonalBet
        formData={{}}
        handleClose={() => setIsModalBetOpen(false)}
        isEdit={false}
        show={isModalBetOpen}
        {...{ token, id, formSubmitted }}
      /> */}
    </div>
  );
};

export default Bets;