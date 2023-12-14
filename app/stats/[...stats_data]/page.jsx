import React from 'react';

import { getStatsByMonth, getBalances } from '@/app/lib/https';

import { Statistics } from '@/components/organisms';

export default async function Page({ params }) {
  const [year] = params.stats_data;

  const statsRes = await getStatsByMonth({
    year
  });

  const balancesRes = await getBalances();

  const start = 2016;
  const end = new Date().getFullYear();
  const yearSelected = year;

  return (
    <Statistics {...{ statsRes, balancesRes, start, end, yearSelected }} />
  );
}
