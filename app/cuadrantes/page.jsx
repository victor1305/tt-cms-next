import React from 'react';

import { getNumberOfRacesByMonth } from '@/lib/https';

import { Tables } from '@/components/organisms';

import { getUserData } from '../api/user';
import { getDayNotesByMonth } from '../lib/https';

export default async function Page() {
  const data = await getUserData();
  const token = data.data.token;
  const year = new Date().getFullYear();
  const monthNumber = new Date().getMonth();
  let monthFormated = monthNumber + 1;
  if (monthFormated < 10) monthFormated = `0${monthFormated}`;

  const numberOfRacesByMonth = await getNumberOfRacesByMonth({
    year,
    month: monthNumber
  });

  const dayDataNotesByMonth = await getDayNotesByMonth({
    year,
    month: monthNumber
  });

  return (
    <Tables
      {...{
        numberOfRacesByMonth,
        token,
        dayDataNotesByMonth,
        isAdmin: data.data.role === 'admin'
      }}
    />
  );
}
