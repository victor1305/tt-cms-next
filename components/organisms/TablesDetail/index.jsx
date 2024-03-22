'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';

import { BtnsBox, QuadrantTable } from '@/components/molecules';

import styles from './TablesDetail.module.scss';

const TablesDetail = ({ tablesData, date }) => {
  const [data, setData] = useState(tablesData);
  const [isModalQuadrantOpen, setIsModalQuadrantOpen] = useState(false);

  const racecoursesCodes = Object.keys(data);

  const btnsList = [
    {
      copy: 'Corregir',
      handleClick: () => setIsModalQuadrantOpen(true)
    }
  ];

  return (
    <div className={styles['tables-detail']}>
      <h1>Tablas del {date}</h1>
      <BtnsBox {...{ btnsList, justify: 'flex-end', width: '1100px' }} />
      <div className={styles['tables-detail__tables']}>
        {racecoursesCodes.map((elm) =>
          data[elm]
            .sort((a, b) => a.number - b.number)
            .map((table, index) => (
              <QuadrantTable key={index} {...{ data: table }} />
            ))
        )}
      </div>
    </div>
  );
};

export default TablesDetail;
