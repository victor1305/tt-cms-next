'use client';

import { useState } from 'react';
import { DotLoader } from 'react-spinners';

import { deleteBet } from '@/lib/https';
import { numberToMonth } from '@/lib/utils';

import { CardBet } from '@/components/atoms';
import { BetModal, ConfirmModal, ProfileBox } from '@/components/molecules';

import styles from './BetsDetail.module.scss';

const BetsDetail = ({
  dayData,
  token,
  day,
  month,
  year,
  racecourses,
  stakes,
  codes
}) => {
  const [dataByDay, setDataByDay] = useState(dayData);
  const [isModalBetOpen, setIsModalBetOpen] = useState(false);
  const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);
  const [betToEdit, setBetToEdit] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);

  const formSubmitted = (bet) => {
    setDataByDay((currentDataByDay) => {
      const index = currentDataByDay.findIndex((item) => item._id === bet._id);
      if (index !== -1) {
        return [
          ...currentDataByDay.slice(0, index),
          bet,
          ...currentDataByDay.slice(index + 1)
        ];
      }
      return currentDataByDay;
    });
    setIsLoading(false);
  };

  const openModal = (id) => {
    const bet = dataByDay.filter((elm) => elm._id === id)[0];
    setBetToEdit(bet);
    setIsModalBetOpen(true);
  };

  const deleteCard = async () => {
    setIsModalConfirmOpen(false);
    setIsLoading(true);
    await deleteBet({ id: cardToDelete, token });
    setDataByDay(dataByDay.filter((elm) => elm._id !== cardToDelete));
    setCardToDelete(null);
    setIsLoading(false);
  };

  return (
    <div className={styles['bets-detail']}>
      <h1>
        Detalle del {day} {numberToMonth(month - 1)} {year}
      </h1>
      {isLoading ? (
        <div className="spinner-container">
          <DotLoader color={'#3860fb'} loading={isLoading} size={90} />
        </div>
      ) : (
        <div className={styles['bets-detail__bets']}>
          <ProfileBox
            text1={`Apuestas realizadas el ${day} ${numberToMonth(
              month - 1
            )} ${year}`}
          >
            {dataByDay.length > 0 ? (
              <div className={styles['bets-detail__bets--box']}>
                {dataByDay.map((elm, index) => (
                  <CardBet
                    key={index}
                    bet={elm}
                    editBet={openModal}
                    deleteCard={() => (
                      setCardToDelete(elm._id), setIsModalConfirmOpen(true)
                    )}
                  />
                ))}
              </div>
            ) : (
              <p className={styles['bets-detail__bets--no-bets']}>
                No hay apuestas en esta fecha
              </p>
            )}
          </ProfileBox>
        </div>
      )}
      <BetModal
        formData={betToEdit}
        handleClose={() => setIsModalBetOpen(false)}
        resetBet={setBetToEdit}
        isEdit={true}
        show={isModalBetOpen}
        {...{ token, formSubmitted, setIsLoading, racecourses, stakes, codes }}
      />
      <ConfirmModal
        text={'¿Estás seguro de borrar esta apuesta?'}
        handleClose={() => setIsModalConfirmOpen(false)}
        show={isModalConfirmOpen}
        hasXToClose={true}
        principalBtn={deleteCard}
        secondaryBtn={() => setIsModalConfirmOpen(false)}
        principalBtnCopy={'Borrar'}
        secondaryBtnCopy={'Cancelar'}
      />
    </div>
  );
};

export default BetsDetail;
