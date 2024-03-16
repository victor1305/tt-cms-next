'use client';

import { useState } from 'react';
import { DotLoader } from 'react-spinners';

import { deleteBet } from '@/lib/https';
import { numberToMonth } from '@/lib/utils';

import { getBetsByDay } from '@/app/lib/https';

import { CardBet } from '@/components/atoms';
import { BetModal, ConfirmModal, ProfileBox } from '@/components/molecules';

import styles from './BetsDetail.module.scss';

const BetsDetail = ({ dayData, token, day, month, year, racecourses, stakes, codes }) => {
  const [dataByDay, setDataByDay] = useState(dayData);
  const [isModalBetOpen, setIsModalBetOpen] = useState(false);
  const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);
  const [betToEdit, setBetToEdit] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);

  const formSubmitted = () => {
    setIsModalBetOpen(false);
    reloadBets();
  };

  const openModal = (id) => {
    const bet = dataByDay.filter((elm) => elm._id === id)[0];
    setBetToEdit(bet);
    setIsModalBetOpen(true);
  };

  const deleteCard = async () => {
    setIsModalConfirmOpen(false);
    await deleteBet({ id: cardToDelete, token });
    setCardToDelete(null);
    reloadBets();
  };

  const reloadBets = async () => {
    setIsLoading(true);
    const res = await getBetsByDay({
      day,
      month,
      year,
      token
    });
    setDataByDay(res);
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
        {...{ token, formSubmitted, racecourses, stakes, codes }}
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
