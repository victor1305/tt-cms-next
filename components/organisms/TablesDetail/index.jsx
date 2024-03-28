'use client';

import React, { useState } from 'react';
import DotLoader from 'react-spinners/DotLoader';

import { saveResults } from '@/lib/https';

import { BtnsBox, QuadrantTable } from '@/components/molecules';

import styles from './TablesDetail.module.scss';

const TablesDetail = ({ tablesData, date, token }) => {
  const [data, setData] = useState(tablesData);
  const [isLoading, setIsLoading] = useState(false);

  const racecoursesCodes = Object.keys(tablesData).sort(
    (a, b) => new Date(tablesData[a][0].date) - new Date(tablesData[b][0].date)
  );

  const validateIfPastDate = (dateStr) => {
    const date = new Date(
      dateStr.substring(4, 8),
      dateStr.substring(2, 4) - 1,
      dateStr.substring(0, 2)
    );
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return date < yesterday;
  };

  const updateDayResults = async () => {
    const isPastDate = validateIfPastDate(date);
    if (!isPastDate) return;
    setIsLoading(true);
    const day = date.slice(-2);
    const month = date.slice(-5, -3);
    const year = date.slice(0, 4);
    const res = await saveResults(`${day}${month}${year}`);
    setData(res);
    setIsLoading(false);
  };

  const btnsList = [
    {
      copy: 'Corregir',
      handleClick: () => updateDayResults()
    }
  ];

  return (
    <div className={styles['tables-detail']}>
      <h1>Tablas del {date}</h1>
      <BtnsBox {...{ btnsList, justify: 'flex-end', width: '1100px' }} />
      {!isLoading ? (
        <div className={styles['tables-detail__tables']}>
          {racecoursesCodes.map((elm) =>
            data[elm]
              .sort((a, b) => a.number - b.number)
              .map((table, index) => (
                <QuadrantTable key={index} {...{ dataRaces: table, token }} />
              ))
          )}
        </div>
      ) : (
        <div className="spinner-container">
          <DotLoader color={'#3860fb'} loading={isLoading} size={90} />
        </div>
      )}
    </div>
  );
};

export default TablesDetail;
