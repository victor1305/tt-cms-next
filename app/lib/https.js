import { apiBetsUrl } from '@/lib/constants';

export const getStats = async ({ year }) => {
  const url = `${apiBetsUrl}stats/${year}`;
  const res = await fetch(url);
  return await res.json();
};

export const getBalances = async () => {
  // const url = `${apiBetsUrl}all-balances`
  // const res = await fetch(url);
  // return await res.json();
  return 'SIUUUUU'
}
