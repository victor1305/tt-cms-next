'use client';

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

import { getRangeBalance } from '@/lib/https';

import { TrendBox } from '@/components/atoms';

import 'react-datepicker/dist/react-datepicker.css';
import styles from './StatsTrends.module.scss';

const StatsTrends = ({ balances }) => {
  const [daysRange, setDaysRange] = useState(0);
  const [dateRange, setDateRange] = useState([null, null]);
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, endDate] = dateRange;
  const { todayResume, yesterdayResume, lastSevenDaysResume } = balances;

  const handleDateChange = (update) => {
    setDateRange(update);
  };

  const getRange = async () => {
    if ((startDate || endDate) === null) {
      return;
    }

    const startDateFormated = dateRange[0].toISOString();
    const endDateFormated = dateRange[1].toISOString();

    try {
      setIsLoading(true);
      const res = await getRangeBalance({ startDateFormated, endDateFormated });
      if (res.length) {
        setDaysRange(res[0].balance.toFixed(2));
      } else {
        setDaysRange(0);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <div className={styles['trends']}>
      <div className={styles['trends__title-container']}>
        <p>Tendencias</p>
      </div>

      <div>
        <TrendBox {...{ copy: 'Hoy: ', balance: todayResume }} />
        <TrendBox {...{ copy: 'Ayer: ', balance: yesterdayResume }} />
        <TrendBox
          {...{
            copy: 'Últimos 7 Días (Contando Hoy): ',
            balance: lastSevenDaysResume
          }}
        />
        <TrendBox
          {...{ copy: 'Rango Personalizado: ', balance: daysRange, isLoading }}
        />

        <div className={styles['trends__input-container']}>
          <DatePicker
            className={styles['trends__input-container__date-input']}
            dateFormat="dd/MM/yyyy"
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => handleDateChange(update)}
            isClearable={true}
          />
          <button className="card-btn" disabled={isLoading} onClick={getRange}>
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatsTrends;
