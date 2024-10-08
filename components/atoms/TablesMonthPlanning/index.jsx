'use client';

import Link from 'next/link';
import React, { useEffect } from 'react';
import DotLoader from 'react-spinners/DotLoader';

import { weekDays } from '@/lib/constants';

import styles from './TablesMonthPlanning.module.scss';

const TablesMonthPlanning = ({
  isLoading,
  dayDataNotesByMonth,
  setIsLoading,
  monthSelected,
  yearSelected,
  data,
  monthDays,
  isAdmin
}) => {
  useEffect(() => {
    setTimeout(() => {
      const elm1 = document.querySelector('#planning-day-7');
      const elm2 = document.querySelector('#planning-day-14');
      const elm3 = document.querySelector('#planning-day-21');
      const elm4 = document.querySelector('#planning-day-28');
      const elm5 = document.querySelector('#planning-day-35');
      const elm6 = document.querySelectorAll(
        '.TablesMonthPlanning_monthly-planner__days__day__7iQfA'
      )[
        document.querySelectorAll(
          '.TablesMonthPlanning_monthly-planner__days__day__7iQfA'
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
                      {data[dayNumber.toString()] ? (
                        <>
                          <div
                            className={`${
                              styles['monthly-planner__days__day__container']
                            } ${
                              isAdmin && dayDataNotesByMonth.length &&
                              dayDataNotesByMonth.find(
                                (elm) => elm.day === dayNumber
                              )
                                ? styles[
                                    'monthly-planner__days__day__container--space'
                                  ]
                                : styles[
                                    'monthly-planner__days__day__container--right'
                                  ]
                            }`}
                          >
                            {isAdmin && dayDataNotesByMonth.length > 0 &&
                              dayDataNotesByMonth.map((elm) => {
                                if (elm.day === dayNumber) {
                                  return (
                                    <p key={elm._id}>
                                      <span
                                        className={
                                          elm.notes ? 'text-win' : 'text-loss'
                                        }
                                      >
                                        A
                                      </span>
                                      <span> </span>
                                      <span
                                        className={
                                          elm?.saved ? 'text-win' : 'text-loss'
                                        }
                                      >
                                        P
                                      </span>
                                      <span> </span>
                                      <span
                                        className={
                                          elm.corrections
                                            ? 'text-win'
                                            : 'text-loss'
                                        }
                                      >
                                        C
                                      </span>
                                    </p>
                                  );
                                }
                              })}
                            <p
                              className={`${styles['monthly-planner__days__day--date']} ${styles['monthly-planner__days__day--no-bets']}`}
                            >
                              {dayNumber > 0 && dayNumber}
                            </p>
                          </div>
                          <div>
                            <p
                              className={
                                styles['monthly-planner__days__day--profit']
                              }
                            >
                              {data[dayNumber.toString()]} Carreras
                            </p>
                            <Link
                              href={{
                                pathname: `/detalle-cuadrante/${yearSelected}-${monthSelected}-${
                                  dayNumber < 10 ? `0${dayNumber}` : dayNumber
                                }`,
                                query: { numb: Math.random() * 100 }
                              }}
                              onClick={() => setIsLoading(true)}
                            >
                              <span className="card-link">Ver Tablas</span>
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
                              Sin Tablas
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

export default TablesMonthPlanning;
