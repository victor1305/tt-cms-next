'use client';

import { useState, useEffect } from 'react';
import DotLoader from 'react-spinners/DotLoader';

import { typesArr, statsByMonthArr } from '@/lib/constants';
import { getStatsByType, getStatsByMonthAndType } from '@/lib/https';
import {
  getArrKeys,
  getTableHeader,
  getTypeTraduction,
  numberToMonth
} from '@/lib/utils';

import { StatsTable, TypesBox } from '@/components/atoms';

import styles from './Stats.module.scss';

const Stats = ({ statsRes, yearSelected }) => {
  const [type, setType] = useState('');
  const [month, setMonth] = useState('');
  const [bets, setBets] = useState(statsRes);
  const [isLoading, setIsLoading] = useState(false);

  const typeTraduction = getTypeTraduction(type);
  const tableHeader = getTableHeader(typeTraduction);
  const arrKeys = getArrKeys(type);

  useEffect(() => {
    const getStatsByMonth = async () => {
      setIsLoading(true);
      const res = await getStatsByMonthAndType({
        year: yearSelected,
        month,
        type
      });
      setBets(res);
      setIsLoading(false);
    };
    month && getStatsByMonth();
  }, [month, type, yearSelected]);

  useEffect(() => {
    const getStats = async () => {
      setIsLoading(true);
      setMonth('');
      const res = await getStatsByType({ year: yearSelected, type });
      setBets(res);
      setIsLoading(false);
    };

    type && getStats();
  }, [type, yearSelected]);

  return (
    <div className={styles['stats']}>
      {isLoading ? (
        <div className={styles['stats--spinner']}>
          <DotLoader color={'#3860fb'} loading={isLoading} size={90} />
        </div>
      ) : (
        <>
          {yearSelected > 2020 && (
            <TypesBox
              {...{
                type,
                setType,
                typesArr,
                label: 'Tipos:',
                defaultKey: 'month'
              }}
            />
          )}
          {yearSelected > 2020 && type && type !== 'month' && (
            <TypesBox
              {...{
                type: month,
                setType: setMonth,
                typesArr: statsByMonthArr,
                label: 'Mes:',
                defaultKey: '00'
              }}
            />
          )}
          <h2>
            Estadísticas por {typeTraduction},{' '}
            {month && month !== '00'
              ? numberToMonth(parseInt(month) - 1)
              : 'Año'}{' '}
            {yearSelected}
          </h2>
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
