'use client';

import { useState } from 'react';
import { DotLoader } from 'react-spinners';

import { editPersonalBet, getPersonalBetsByDay } from '@/lib/https';
import { numberToMonth } from '@/lib/utils';

import { CardMyBet } from '@/components/atoms';
import { PersonalBet, ProfileBox } from '@/components/molecules';

const MyBetsDetail = ({ dayData, token, day, month, year, clientId }) => {
  const [dataByDay, setDataByDay] = useState(dayData);
  const [isModalBetOpen, setIsModalBetOpen] = useState(false);
  const [betToEdit, setBetToEdit] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const formSubmitted = (bet) => {
    setIsModalBetOpen(false);
    reloadBets(bet);
  };

  const openModal = (id) => {
    setBetToEdit(dataByDay.filter((elm) => elm._id === id));
    setIsModalBetOpen(true);
  };

  const reloadBets = async (bet) => {
    setIsLoading(true);
    await editPersonalBet({
      bet,
      userId: token
    });
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
    <div>
      <h1>
        Detalle del {day} {numberToMonth(month - 1)} {year}
      </h1>
      {isLoading ? (
        <div className="spinner-container">
          <DotLoader color={'#3860fb'} loading={isLoading} size={90} />
        </div>
      ) : (
        <ProfileBox
          text1={`Bookies utilizadas el ${day} ${numberToMonth(
            month - 1
          )} ${year}`}
        >
          {dataByDay.map((elm, index) => (
            <CardMyBet key={index} bet={elm} editBet={openModal} />
          ))}
        </ProfileBox>
      )}
      <PersonalBet
        formData={betToEdit}
        handleClose={() => setIsModalBetOpen(false)}
        isEdit={true}
        show={isModalBetOpen}
        {...{ token, formSubmitted }}
      />
    </div>
  );
};

export default MyBetsDetail;
