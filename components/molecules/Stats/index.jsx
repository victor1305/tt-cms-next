'use client';

import { useState, useEffect } from 'react';
import DotLoader from 'react-spinners/DotLoader';

import { getStatsByType } from '@/lib/https';

import { StatsTable, TypesBox } from '@/components/atoms';

import styles from './Stats.module.scss';

const Stats = ({ statsRes, yearSelected }) => {
  const [type, setType] = useState('');
  const [bets, setBets] = useState(statsRes);
  const [isLoading, setIsLoading] = useState(false);

  const typeTraduction =
    !type || type === 'month'
      ? 'Mes'
      : type === 'category'
      ? 'Categoría'
      : type === 'stake'
      ? 'Stake'
      : 'Hipódromo';

  const tableHeader = [
    typeTraduction,
    'Apuestas',
    'Aciertos',
    'Fallos',
    'Nulos',
    'Acierto',
    'Stake Medio',
    'Uds Jugadas',
    'Yield',
    'Profit'
  ];

  const arrKeys = [
    !type ? 'month' : type,
    'bets',
    'wins',
    'loss',
    'voids',
    'win_percent',
    'medium_stake',
    'units_staked',
    'yield',
    'profit'
  ];

  useEffect(() => {
    const getStats = async () => {
      setIsLoading(true);
      const res = await getStatsByType({ year: yearSelected, type });
      setBets(res);
      setIsLoading(false);
    };

    type && getStats();
  }, [type, yearSelected]);

  return (
    <div>
      {isLoading ? (
        <div className={styles['stats--spinner']}>
          <DotLoader color={'#3860fb'} loading={isLoading} size={90} />
        </div>
      ) : (
        <>
          <h2>
            Estadísticas por {typeTraduction}, Año {yearSelected}
          </h2>
          {yearSelected > 2020 && <TypesBox {...{ type, setType }} />}
          <StatsTable
            {...{
              bets,
              arrKeys,
              tableHeader,
              statsType: typeTraduction,
              type: !type ? 'month' : type
            }}
          />
        </>
      )}
    </div>
  );
};

export default Stats;
