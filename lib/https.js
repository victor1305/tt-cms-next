import { apiBetsUrl, apiClientsUrl, apiUsersUrl } from '@/lib/constants';

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
