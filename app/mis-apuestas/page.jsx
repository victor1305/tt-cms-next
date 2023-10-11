import React from 'react';

import { getUserData } from '@/app/api/user';
import { getPersonalBetsByMonth } from '@/app/lib/https';

import { MyBets } from '@/components/organisms';

export default async function Page() {
  const data = await getUserData();
  const id = data.data.id;
  const year = new Date().getFullYear();
  const monthNumber = new Date().getMonth();

  const balances = await getPersonalBetsByMonth({ id, month: monthNumber, year });
  return <MyBets {...{ id, balances }} />;
}