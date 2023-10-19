import { redirect } from 'next/navigation';
import React from 'react';

import { getDayFormatted, getMonthFormatted } from '@/lib/utils';

import { getUserData } from '@/app/api/user';
import { getPersonalBetsByDay } from '@/app/lib/https';

import { MyBetsDetail } from '@/components/organisms';

export default async function Page({ params }) {
  const [day_data] = params.day_data;

  const isoDate = new Date(day_data);

  const year = isoDate.getFullYear();
  const month = getMonthFormatted(isoDate.getMonth());
  const day = getDayFormatted(isoDate.getDate());

  const data = await getUserData();
  const id = data.data.id;
  const token = data.data.token;

  const dayData = await getPersonalBetsByDay({ id, year, month, day, token });

  if (!dayData.length) redirect('/mis-apuestas');

  const dataFormatted = dayData.map((elm) => {
    return {
      ...elm,
      date: new Date(elm.date)
    };
  });

  return (
    <MyBetsDetail
      {...{ dayData: dataFormatted, clientId: id, token, year, month, day }}
    />
  );
}
