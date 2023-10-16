import { apiBetsUrl, apiClientsUrl, apiUsersUrl } from '@/lib/constants';

import { updateDate } from './utils';

export const getStatsByType = async ({ year, type }) => {
  const url = `${apiBetsUrl}stats/${year}/${type}`;
  const res = await fetch(url, {
    ...(year === new Date().getFullYear() && { next: { revalidate: 0 } })
  });
  const { data } = await res.json();
  return data;
};

export const getRangeBalance = async ({
  startDateFormated,
  endDateFormated
}) => {
  const url = `${apiBetsUrl}balance-rango/${startDateFormated}/${endDateFormated}`;
  const res = await fetch(url, {
    next: { revalidate: 0 }
  });
  const { data } = await res.json();
  return data;
};

export const getBetsByMonth = async ({ month, year }) => {
  const url = `${apiBetsUrl}lista-apuestas-mes?month=${month + 1}&year=${year}`;
  const res = await fetch(url, { next: { revalidate: 0 } });
  const { data } = await res.json();

  return data;
};

export const getPersonalBetsByMonth = async ({ month, year, id, token }) => {
  const url = `${apiBetsUrl}lista-apuestas-personales-mes/${id}?month=${
    month + 1
  }&year=${year}`;
  const res = await fetch(url, {
    next: { revalidate: 0 },
    headers: {
      'auth-token': token
    }
  });
  const { data } = await res.json();

  return data;
};

export const getPersonalBetsByDay = async ({ day, month, year, id, token }) => {
  const url = `${apiBetsUrl}lista-apuestas-personales-dia/${id}?day=${day}&month=${month}&year=${year}`;
  const res = await fetch(url, {
    next: { revalidate: 0 },
    headers: {
      'auth-token': token
    }
  });
  const { data } = await res.json();
  return data;
};

export const createPersonalBet = async ({ personalBet, token, id }) => {
  personalBet.userId = id;
  personalBet.date = updateDate(personalBet.date);
  const url = `${apiBetsUrl}crear-apuesta-personal`;
  const res = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'auth-token': token
    },
    method: 'POST',
    body: JSON.stringify(personalBet)
  });
  const data = await res.json();

  return data;
};

export const editPersonalBet = async ({ personalBet, userId }) => {
  const url = `${apiBetsUrl}crear-apuesta-personal/${personalBet._id}/edit`;
  const res = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'auth-token': userId
    },
    method: 'PUT',
    body: JSON.stringify(personalBet)
  });
  const data = await res.json();

  return data;
};

export const deletePersonalBet = async ({ id, userId }) => {
  const url = `${apiBetsUrl}crear-apuesta-personal/${id}/delete`;
  const res = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'auth-token': userId
    },
    method: 'DELETE'
  });
  const data = await res.json();

  return data;
};

export const getPaymentsByUser = async ({ id, year, monthFormated }) => {
  const url = `${apiClientsUrl}lista-apuestas-perfil/${id}/${year}/${monthFormated}`;
  const res = await fetch(url, { next: { revalidate: 0 } });
  const { data } = await res.json();

  return data;
};

export const loginUser = async (user) => {
  const url = `${apiUsersUrl}iniciar-sesion-turftipster`;
  const res = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(user)
  });

  const data = await res.json();
  return data;
};
