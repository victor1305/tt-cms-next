'use client';

import React from 'react';

import { BtnsBox, QuadrantTable } from '@/components/molecules';

import styles from './TablesDetail.module.scss';

const TablesDetail = ({ tablesData, date, token }) => {
  // const [data, setData] = useState(tablesData);
  // const [isModalQuadrantOpen, setIsModalQuadrantOpen] = useState(false);

  const racecoursesCodes = Object.keys(tablesData).sort((a, b) => new Date(tablesData[a][0].date) - new Date(tablesData[b][0].date));

  const btnsList = [
    {
      copy: 'Corregir',
      handleClick: () => console.log('CORREGIR CUADRANTE')
    }
  ];

  return (
    <div className={styles['tables-detail']}>
      <h1>Tablas del {date}</h1>
      <BtnsBox {...{ btnsList, justify: 'flex-end', width: '1100px' }} />
      <div className={styles['tables-detail__tables']}>
        {racecoursesCodes.map((elm) =>
          tablesData[elm]
            .sort((a, b) => a.number - b.number)
            .map((table, index) => (
              <QuadrantTable key={index} {...{ dataRaces: table, token }} />
            ))
        )}
      </div>
    </div>
  );
};

export default TablesDetail;
