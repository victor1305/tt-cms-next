'use client';

import { useState } from 'react';
import { DotLoader } from 'react-spinners';

import { deletePersonalBet, getPersonalBetsByDay } from '@/lib/https';
import { numberToMonth } from '@/lib/utils';

import { CardMyBet } from '@/components/atoms';
import { ConfirmModal, PersonalBet, ProfileBox } from '@/components/molecules';

import styles from './MyBetsDetail.module.scss';

const MyBetsDetail = ({ dayData, token, day, month, year, clientId }) => {
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
    await deletePersonalBet({ id: cardToDelete, token });
    setCardToDelete(null);
    reloadBets();
  };

  const reloadBets = async () => {
    setIsLoading(true);
    const res = await getPersonalBetsByDay({
      day,
      month,
      year,
      id: clientId,
      token
    });
    setDataByDay(res);
    setIsLoading(false);
  };
  return (
    <div className={styles['my-bets-profile']}>
      <h1>
        Detalle del {day} {numberToMonth(month - 1)} {year}
      </h1>
      {isLoading ? (
        <div className="spinner-container">
          <DotLoader color={'#3860fb'} loading={isLoading} size={90} />
        </div>
      ) : (
        <div className={styles['my-bets-profile__bets']}>
          <ProfileBox
            text1={`Bookies utilizadas el ${day} ${numberToMonth(
              month - 1
            )} ${year}`}
          >
            {dataByDay.length > 0 ? (
              <div className={styles['my-bets-profile__bets--box']}>
                {dataByDay.map((elm, index) => (
                  <CardMyBet
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
              <p className={styles['my-bets-profile__bets--no-bets']}>
                No hay apuestas en esta fecha
              </p>
            )}
          </ProfileBox>
        </div>
      )}
      <PersonalBet
        formData={betToEdit}
        handleClose={() => setIsModalBetOpen(false)}
        isEdit={true}
        show={isModalBetOpen}
        {...{ token, formSubmitted }}
      />
      <ConfirmModal
        text={'¿Estás seguro de borrar esta tarjeta?'}
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

export default MyBetsDetail;
