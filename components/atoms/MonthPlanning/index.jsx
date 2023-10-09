'use client';

import classNames from 'classnames';
import Link from 'next/link';
import React, { useEffect } from 'react';
import DotLoader from 'react-spinners/DotLoader';

import { weekDays } from '@/lib/constants';

import styles from './MonthPlanning.module.scss';

const MonthlyPlanner = ({
  isLoading,
  monthDays,
  data,
  monthSelected,
  yearSelected
}) => {
  const getDayProfit = (index) =>
    index > 0 && data.length > 0
      ? data[index - 1].reduce((acc, elm) => acc + elm.profit, 0)
      : 0;

  useEffect(() => {
    setTimeout(() => {
      const elm1 = document.querySelector('#planning-day-7');
      const elm2 = document.querySelector('#planning-day-14');
      const elm3 = document.querySelector('#planning-day-21');
      const elm4 = document.querySelector('#planning-day-28');
      const elm5 = document.querySelector('#planning-day-35');
      const elm6 = document.querySelectorAll(
        '.MonthPlanning_monthly-planner__days__day__jx32s'
      )[
        document.querySelectorAll(
          '.MonthPlanning_monthly-planner__days__day__jx32s'
        ).length - 1
      ];
      elm1.style.borderRight = '1px solid rgb(34, 37, 49)';
      elm2.style.borderRight = '1px solid rgb(34, 37, 49)';
      elm3.style.borderRight = '1px solid rgb(34, 37, 49)';
      elm4.style.borderRight = '1px solid rgb(34, 37, 49)';
      elm5 && (elm5.style.borderRight = '1px solid rgb(34, 37, 49)');
      elm6.style.borderRight = '1px solid rgb(34, 37, 49)';
    }, 300);
    // eslint-disable-next-line
  }, [data]);

  return (
    <>
      {isLoading ? (
        <div className="spinner-container">
          <DotLoader color={'#3860fb'} loading={isLoading} size={90} />
        </div>
      ) : (
        <div className={styles['monthly-planner']}>
          <div className={styles['monthly-planner__days-container']}>
            {weekDays.map((elm, index) => (
              <div
                key={index}
                className={styles['monthly-planner__days-container--day']}
              >
                {elm}
              </div>
            ))}
          </div>
          <div className={styles['monthly-planner__days']}>
            {monthDays.length &&
              monthDays.map((dayNumber, index) => (
                <div
                  className={styles['monthly-planner__days__day']}
                  key={dayNumber}
                  id={`planning-day-${index + 1}`}
                >
                  {dayNumber > 0 && (
                    <div>
                      {data[dayNumber - 1] && data[dayNumber - 1].length > 0 ? (
                        <>
                          <p
                            className={
                              styles['monthly-planner__days__day--date']
                            }
                          >
                            <span>
                              {data[dayNumber - 1].length}{' '}
                              {data[dayNumber - 1].length === 1
                                ? 'Apuesta'
                                : 'Apuestas'}
                            </span>
                            {dayNumber > 0 && dayNumber}
                          </p>
                          <div>
                            <p
                              className={classNames(
                                styles['monthly-planner__days__day--profit'],
                                {
                                  'text-win': getDayProfit(dayNumber) > 0,
                                  'text-loss': getDayProfit(dayNumber) < 0,
                                  'text-void': getDayProfit(dayNumber) === 0
                                }
                              )}
                            >
                              {getDayProfit(dayNumber).toFixed(2)} Uds
                            </p>
                            <Link
                              href={{
                                pathname: `/detalle-dia/${yearSelected}-${monthSelected}-${dayNumber}`
                              }}
                            >
                              <span className="card-link">Detalle</span>
                            </Link>
                          </div>
                        </>
                      ) : (
                        <>
                          <p
                            className={`${styles['monthly-planner__days__day--date']} ${styles['monthly-planner__days__day--no-bets']}`}
                          >
                            {dayNumber > 0 && dayNumber}
                          </p>
                          <div>
                            <p
                              className={`text-void ${styles['monthly-planner__days__day--no-data']}`}
                            >
                              Sin Apuestas
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};
export default MonthlyPlanner;
