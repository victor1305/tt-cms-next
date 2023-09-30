import React from 'react';

import { getStatsByMonth, getBalances } from '@/app/lib/https';

import { Statistics } from '@/components/organisms';

export default async function Stats({ params }) {
  const [year] = params.stats_data;

  const [statsRes, balancesRes] = await Promise.all([
    getStatsByMonth({
      year
    }),
    getBalances()
  ]);

  const start = 2010;
  const end = new Date().getFullYear();
  const yearSelected = year;

  return (
    <Statistics {...{ statsRes, balancesRes, start, end, yearSelected }} />
  );
}