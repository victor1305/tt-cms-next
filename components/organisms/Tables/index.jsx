'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';

import { getNumberOfRacesByMonth } from '@/lib/https';
import {
  calculateNumberDaysOnMonthForTable,
  getMonthFormatted,
  numberToMonth
} from '@/lib/utils';

import { getDayNotesByMonth } from '@/app/lib/https';

import { TablesMonthPlanning } from '@/components/atoms';
import {
  BtnsBox,
  CreateQuadrantModal,
  ProfileBox
} from '@/components/molecules';

import 'react-datepicker/dist/react-datepicker.css';
import styles from './Tables.module.scss';

const Tables = ({
  numberOfRacesByMonth,
  token,
  dayDataNotesByMonth,
  isAdmin
}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [isModalQuadrantOpen, setIsModalQuadrantOpen] = useState(false);
  const [data, setData] = useState(numberOfRacesByMonth);
  const [dayDataNotes, setDayDataNotes] = useState(dayDataNotesByMonth);
  const [monthDays, setMonthDays] = useState(
    calculateNumberDaysOnMonthForTable(startDate)
  );
  const [isLoading, setIsLoading] = useState(false);

  const year = startDate.getFullYear();
  const month = numberToMonth(startDate.getMonth());

  const isFirstRenderRef = useRef(true);

  const btnsList = [
    {
      copy: 'Crear Cuadrante',
      handleClick: () => setIsModalQuadrantOpen(true)
    }
  ];

  const formSubmitted = () => {
    reloadBets();
  };

  const reloadBets = useCallback(async () => {
    setIsLoading(true);
    const res = await getNumberOfRacesByMonth({
      year,
      month: startDate.getMonth()
    });
    if (res) {
      setData(res);
      setMonthDays(calculateNumberDaysOnMonthForTable(startDate));
    }
    const resDayNotes = await getDayNotesByMonth({
      year,
      month: startDate.getMonth()
    });

    if (resDayNotes) {
      setDayDataNotes(resDayNotes);
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
    <div className={styles['tables']}>
      <h1>Cuadrantes</h1>
      <BtnsBox {...{ btnsList, justify: 'flex-end', width: '1100px' }} />
      <div
        className={`${styles['tables__payments']} ${styles['tables__payments--first']}`}
      >
        <ProfileBox
          text1={`Fecha: ${month} ${year}`}
          text2="Selecciona otro mes:"
          startDate={startDate}
          setStartDate={setStartDate}
        >
          <TablesMonthPlanning
            {...{
              data,
              monthDays,
              setIsLoading,
              isLoading,
              monthSelected: getMonthFormatted(startDate.getMonth()),
              yearSelected: year,
              dayDataNotesByMonth: dayDataNotes,
              isAdmin
            }}
          />
        </ProfileBox>
      </div>
      <CreateQuadrantModal
        handleClose={() => setIsModalQuadrantOpen(false)}
        show={isModalQuadrantOpen}
        {...{ formSubmitted, token, setIsLoading }}
      />
    </div>
  );
};

export default Tables;
