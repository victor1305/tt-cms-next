import { apiBetsUrl } from '@/lib/constants';

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
