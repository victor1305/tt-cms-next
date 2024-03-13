import React from 'react';

import { getBetsByMonth } from '@/lib/https';

import { Bets } from '@/components/organisms';

import { getUserData } from '../api/user';
import { getStakesList, getRacecoursesList, getCodesList } from '../lib/https';

export default async function Page() {
  const data = await getUserData();
  const token = data.data.token;
  const year = new Date().getFullYear();
  const monthNumber = new Date().getMonth();
  let monthFormated = monthNumber + 1;
  if (monthFormated < 10) monthFormated = `0${monthFormated}`;
  const betsByMonth = await getBetsByMonth({ month: monthNumber, year });
  const stakesList = await getStakesList();
  const racecoursesList = await getRacecoursesList();
  const codesList = await getCodesList();
  return <Bets {...{ token, betsData: betsByMonth, stakesList, racecoursesList, codesList }} />;
}
