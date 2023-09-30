import { apiBetsUrl } from '@/lib/constants';
import stats2016 from '@/lib/historyStats/2016.json';
import stats2017 from '@/lib/historyStats/2017.json';
import stats2018 from '@/lib/historyStats/2018.json';
import stats2019 from '@/lib/historyStats/2019.json';
import stats2020 from '@/lib/historyStats/2020.json';

const statsByYear = {
  2016: stats2016,
  2017: stats2017,
  2018: stats2018,
  2019: stats2019,
  2020: stats2020
};

export const getStatsByMonth = async ({ year }) => {
  const currentYear = parseInt(year);
  if (currentYear < 2021 && currentYear > 2015) {
    return statsByYear[currentYear];
  }
  const url = `${apiBetsUrl}stats/${year}/month`;
  const res = await fetch(url, {
    ...(parseInt(year) === new Date().getFullYear() && {
      next: { revalidate: 0 }
    })
  });
  const { data } = await res.json();

  return data;
};

export const getBalances = async () => {
  // const url = `${apiBetsUrl}all-balances`
  // const res = await fetch(url);
  // return await res.json();
  return 'SIUUUUU';
};
