import React from 'react';

import { YearsBox } from '@/components/atoms';
import { Stats, StatsTrends } from '@/components/molecules';

import styles from './Statistics.module.scss';

const Statistics = ({ statsRes, balancesRes, end, start, yearSelected }) => {
  const yearsArr = [...Array(end - start + 1).keys()].map((x) => x + start);
  return (
    <>
      <h1>Stats</h1>

      <div className={styles['stats']}>
        <div className={styles['stats__subtitle']}>
          <p>Estadísticas y Tendencias</p>
        </div>

        <YearsBox {...{ yearsArr, yearSelected }} />
        <Stats {...{ statsRes, balancesRes, yearSelected }} />
        <div className={styles['stats__trends']}>
          <StatsTrends {...{ balances: balancesRes }} />
        </div>
      </div>
    </>
  );
};

export default Statistics;
