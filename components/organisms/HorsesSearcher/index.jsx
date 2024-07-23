'use client';

import React, { useState } from 'react';
import DotLoader from 'react-spinners/DotLoader';

import { searchHorses } from '@/lib/https';

import {
  HorseModal,
  HorsesSearcherForm,
  HorsesSearcherResults
} from '@/components/molecules';

import styles from './HorsesSearcher.module.scss';

const HorsesSearcher = ({ token }) => {
  const [horses, setHorses] = useState([]);
  const [horseData, setHorseData] = useState({ horseName: '', horseAge: null });
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchDone, setIsSearchDone] = useState(false);
  const [modalHorse, setModalHorse] = useState(false);
  const [modalHorseData, setModalHorseData] = useState(false);

  const openHorseData = (horse) => {
    setModalHorseData(horse);
    setModalHorse(true);
  };

  const searchHorse = async () => {
    setIsLoading(true);
    const res = await searchHorses(horseData, token);
    setHorses(res);
    setIsSearchDone(true);
    setHorseData({ horseName: '', horseAge: null });
    setIsLoading(false);
  };

  const horseSubmitted = (newRace) => {
    const updatedHorses = horses.map((horse) => {
      if (horse._id === modalHorseData._id) {
        const updatedValues = [...horse.values, newRace];
        return {
          ...horse,
          values: updatedValues.sort(
            (a, b) => new Date(a.date) - new Date(b.date)
          )
        };
      }
      return horse;
    });
    setModalHorseData({
      ...modalHorseData,
      values: [...modalHorseData.values, newRace].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      )
    });
    setHorses(updatedHorses);
  };

  return (
    <div>
      {isLoading ? (
        <div className="spinner-container">
          <DotLoader color={'#3860fb'} loading={isLoading} size={90} />
        </div>
      ) : (
        <div className={styles['horses-searcher']}>
          <h1>Buscador de Caballos</h1>
          <div className={styles['horses-searcher__search']}>
            <HorsesSearcherForm {...{ setHorseData, horseData, searchHorse }} />
          </div>
          {isSearchDone && (
            <div className={styles['horses-searcher__search-results']}>
              {horses.length === 0 ? (
                <p>No hay resultados para el caballo que buscas</p>
              ) : (
                <>
                  <HorsesSearcherResults {...{ horses, openHorseData }} />
                </>
              )}
            </div>
          )}
          <HorseModal
            handleClose={() => setModalHorse(false)}
            {...{
              token,
              show: modalHorse,
              id: modalHorseData._id,
              horseSubmitted,
              horseData: modalHorseData
            }}
          />
        </div>
      )}
    </div>
  );
};

export default HorsesSearcher;
