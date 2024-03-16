import { redirect } from 'next/navigation';
import React from 'react';

import { getDayFormatted, getMonthFormatted } from '@/lib/utils';

import { getUserData } from '@/app/api/user';
import { getBetsByDay, getStakesList, getRacecoursesList, getCodesList } from '@/app/lib/https';

import { BetsDetail } from '@/components/organisms';

export default async function Page({ params }) {
  const [day_data] = params.day_data;

  const isoDate = new Date(day_data);

  const year = isoDate.getFullYear();
  const month = getMonthFormatted(isoDate.getMonth());
  const day = getDayFormatted(isoDate.getDate());

  const data = await getUserData();
  const token = data.data.token;

  const dayData = await getBetsByDay({ year, month, day, token });

  if (!dayData.length) redirect('/apuestas');

  const stakes = await getStakesList();
  const racecourses = await getRacecoursesList();
  const codes = await getCodesList();

  return <BetsDetail 
  {...{ dayData: dayData, token, year, month, day, racecourses, stakes, codes }}
  />;
}
