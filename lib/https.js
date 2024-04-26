import {
  apiBetsUrl,
  apiClientsUrl,
  apiRacesUrl,
  apiUsersUrl
} from '@/lib/constants';

import { updateDate } from './utils';

export const getStatsByType = async ({ year, type }) => {
  const url = `${apiBetsUrl}stats/${year}/${type}`;
  const res = await fetch(url, {
    ...(year === new Date().getFullYear() && { next: { revalidate: 0 } })
  });
  const { data } = await res.json();
  return data;
};

export const getStatsByMonthAndType = async ({ year, month, type }) => {
  const url = `${apiBetsUrl}stats/${year}/${month}/${type}`;
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

export const getNumberOfRacesByMonth = async ({ month, year }) => {
  const url = `${apiRacesUrl}cargar-carreras-por-mes/${year}/${month + 1}`;
  const res = await fetch(url, { next: { revalidate: 0 } });
  const data = await res.json();

  return data;
};

export const getClientsList = async () => {
  const url = `${apiClientsUrl}lista-clientes`;
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

export const createBet = async ({ bet, token, id }) => {
  bet.userId = id;
  bet.date = updateDate(bet.date);
  const url = `${apiBetsUrl}crear-apuesta`;
  const res = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'auth-token': token
    },
    method: 'POST',
    body: JSON.stringify(bet)
  });
  const data = await res.json();

  return data;
};

export const createPersonalBet = async ({ personalBet, token }) => {
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

export const createQuadrantDay = async ({ date, token }) => {
  const url = `${apiRacesUrl}crear-dia-carreras`;
  const res = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'auth-token': token
    },
    method: 'POST',
    body: JSON.stringify({ date })
  });
  const { data } = await res.json();
  return data;
};

export const createHorseRace = async ({ raceData, token, id }) => {
  const url = `${apiRacesUrl}crear-carrera-caballo/${id}`;
  const res = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'auth-token': token
    },
    method: 'POST',
    body: JSON.stringify(raceData)
  });
  const data = await res.json();
  return data;
};

export const saveResults = async (date) => {
  const url = `${apiRacesUrl}actualizar-resultados-carrera`;
  const res = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({ date })
  });
  const data = await res.json();
  return data;
};

export const createClient = async ({ client, token }) => {
  const url = `${apiClientsUrl}crear-cliente`;
  const res = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'auth-token': token
    },
    method: 'POST',
    body: JSON.stringify(client)
  });
  const data = await res.json();

  return data;
};

export const createPayment = async ({ payment, token }) => {
  const url = `${apiClientsUrl}crear-informacion-pago`;
  payment.month = payment.date;

  const res = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'auth-token': token
    },
    method: 'POST',
    body: JSON.stringify(payment)
  });
  const data = await res.json();

  return data;
};

export const createParameter = async ({ parameter, token }) => {
  const url = `${apiBetsUrl}crear-informacion-pago`;

  const res = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'auth-token': token
    },
    method: 'POST',
    body: JSON.stringify(parameter)
  });
  const data = await res.json();

  return data;
};

export const editValue = async ({ value, token, id }) => {
  const url = `${apiRacesUrl}editar-valor/${id}/edit`;
  const res = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'auth-token': token
    },
    method: 'PUT',
    body: JSON.stringify({ value })
  });
  const data = await res.json();
  return data;
};

export const editDayNote = async ({ parameter, token, id }) => {
  const url = `${apiRacesUrl}editar-dia/${id}/edit`;
  const res = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'auth-token': token
    },
    method: 'PUT',
    body: JSON.stringify({ parameter })
  });
  const data = await res.json();
  return data;
};

export const editBet = async ({ bet, token, betId }) => {
  const url = `${apiBetsUrl}detalle-apuesta/${betId}/edit`;
  const res = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'auth-token': token
    },
    method: 'PUT',
    body: JSON.stringify(bet)
  });
  const data = await res.json();
  return data;
};

export const editPersonalBet = async ({ personalBet, token, betId }) => {
  const url = `${apiBetsUrl}crear-apuesta-personal/${betId}/edit`;
  const res = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'auth-token': token
    },
    method: 'PUT',
    body: JSON.stringify(personalBet)
  });
  const data = await res.json();
  return data;
};

export const editPayment = async ({
  payment,
  token,
  paymentId,
  beneficiaryId
}) => {
  const url = `${apiClientsUrl}editar-informacion-pago/${paymentId}/${beneficiaryId}`;
  payment.client = payment.clientId[0];

  if (typeof payment.beneficiary === 'object') {
    payment.beneficiary = beneficiaryId;
  }

  const res = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'auth-token': token
    },
    method: 'PUT',
    body: JSON.stringify(payment)
  });
  const data = await res.json();
  return data;
};

export const deletePayment = async ({
  paymentId,
  clientId,
  beneficiaryId,
  token
}) => {
  const url = `${apiClientsUrl}borrar-pago/${paymentId}/${clientId}/${beneficiaryId}`;
  const res = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'auth-token': token
    },
    method: 'DELETE'
  });
  const data = await res.json();

  return data;
};

export const deleteBet = async ({ id, token }) => {
  const url = `${apiBetsUrl}detalle-apuesta/${id}/delete`;
  const res = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'auth-token': token
    },
    method: 'DELETE'
  });
  const data = await res.json();

  return data;
};

export const deletePersonalBet = async ({ id, token }) => {
  const url = `${apiBetsUrl}crear-apuesta-personal/${id}/delete`;
  const res = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'auth-token': token
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

export const getPaymentsListByMonth = async ({ year, month }) => {
  const url = `${apiClientsUrl}lista-pagos/${year}/${month}`;
  const res = await fetch(url, { next: { revalidate: 0 } });
  const data = await res.json();
  return data;
};

export const getPaymentsListByYear = async ({ year }) => {
  const url = `${apiClientsUrl}lista-pagos-anual/${year}`;
  const res = await fetch(url, { next: { revalidate: 0 } });
  const data = await res.json();
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
