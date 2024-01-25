import React from 'react';

import { getBetsByMonth } from '@/lib/https';

import { Bets } from '@/components/organisms';

export default async function Page() {
  const year = new Date().getFullYear();
  const monthNumber = new Date().getMonth();
  let monthFormated = monthNumber + 1;
  if (monthFormated < 10) monthFormated = `0${monthFormated}`;
  const betsByMonth = await getBetsByMonth({ month: monthNumber, year });
  return <Bets {...{ betsData: betsByMonth }} />;
}
