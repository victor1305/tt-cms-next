'use client';

import { useState } from 'react';

import { defaultHorseRace } from '@/lib/constants';
import { createHorseRace } from '@/lib/https';
import { formatName, traductGenre } from '@/lib/utils';

import { BasicModal, HorseModalData, HorseModalForm } from '@/components/atoms';

import styles from './HorseModal.module.scss';

const HorseModal = ({
  handleClose,
  show,
  token,
  id,
  horseSubmitted,
  horseData
}) => {
  const [isInvalidForm, setIsInvalidForm] = useState(false);
  const [raceData, setRaceData] = useState(defaultHorseRace);
  const [isForm, setIsForm] = useState(false);

  const closeModal = () => {
    handleClose();
    resetForm();
  };

  const resetForm = () => {
    setRaceData(defaultHorseRace);
    setIsInvalidForm(false);
    setIsForm(false);
  };

  const validateForm = () => {
    const isInValid =
      !raceData.value.length || !raceData.surface.length || !raceData.date;
    setIsInvalidForm(isInValid);
    return isInValid;
  };

  const saveData = async () => {
    if (validateForm()) return;
    const res = await createHorseRace({ raceData, token, id });
    horseSubmitted(res);
    resetForm();
  };

  return (
    <BasicModal
      {...{ show, handleClose: closeModal, hasXToClose: true, width: '700px' }}
    >
      <div className={styles['horse-modal']}>
        <div className={styles['horse-modal__title']}>
          <div>
            <h4 className={styles['horse-modal__title--principal']}>
              {horseData.thisRaceData.race}
              {String(horseData.thisRaceData.number.toString()).padStart(
                2,
                '0'
              )}{' '}
              {formatName(horseData.name)} - {horseData.thisRaceData.weight}Kg -
              Cajón {horseData.thisRaceData.box}
            </h4>
            <p className={styles['horse-modal__title--subtitle']}>
              {horseData.genre && <span>{traductGenre(horseData.genre)}</span>}
              <span>
                {` ${
                  new Date().getFullYear() - (horseData.year || 0)
                } años `}
              </span>
              {horseData.father &&
                horseData.mother &&
                horseData.grandFather && (
                  <span>
                    {`por ${formatName(horseData.father)} y 
                  ${formatName(horseData.mother)} (${formatName(
                    horseData.grandFather
                  )})`}
                  </span>
                )}
            </p>
            <p>
              Jockey: <span>{formatName(horseData.thisRaceData.jockey)}</span>
            </p>
            <p>
              Preparador:{' '}
              <span>{formatName(horseData.thisRaceData.trainer)}</span>
            </p>
          </div>
          <div>
            <button
              className="form-btn form-btn--primary"
              onClick={() => setIsForm(!isForm)}
            >
              {isForm ? 'Ver carreras' : 'Añadir nueva'}
            </button>
          </div>
        </div>
        {isForm ? (
          <HorseModalForm
            {...{ isInvalidForm, raceData, setRaceData, saveData }}
          />
        ) : (
          <HorseModalData {...{ horseData }} />
        )}
      </div>
    </BasicModal>
  );
};

export default HorseModal;
