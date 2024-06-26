import { redirect } from 'next/navigation';
import React from 'react';

import { getDayFormatted, getMonthFormatted } from '@/lib/utils';

import { getUserData } from '@/app/api/user';
import { getDayNotesByDay, getTablesByDay } from '@/app/lib/https';

import { TablesDetail } from '@/components/organisms';

export default async function Page({ params }) {
  const [day_data] = params.day_data;
  const data = await getUserData();
  const token = data.data.token;
  const isoDate = new Date(day_data);

  const year = isoDate.getFullYear();
  const month = getMonthFormatted(isoDate.getMonth());
  const day = getDayFormatted(isoDate.getDate());

  const tablesData = await getTablesByDay({ year, month, day });
  const dayData = await getDayNotesByDay({ year, month, day });

  if (!tablesData) redirect('/cuadrantes');

  return (
    <TablesDetail
      {...{
        tablesData,
        date: day_data,
        token,
        dayData: dayData.length ? dayData[0] : null
      }}
    />
  );
}
