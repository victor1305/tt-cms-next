import { redirect } from 'next/navigation';
import React from 'react';

import { getDayFormatted, getMonthFormatted } from '@/lib/utils';

import { getUserData } from '@/app/api/user';
import { getTablesByDay } from '@/app/lib/https';

import { TablesDetail } from '@/components/organisms';

export default async function Page({ params }) {
  const [day_data] = params.day_data;

  const isoDate = new Date(day_data);

  const year = isoDate.getFullYear();
  const month = getMonthFormatted(isoDate.getMonth());
  const day = getDayFormatted(isoDate.getDate());

  const data = await getUserData();
  const token = data.data.token;

  const tablesData = await getTablesByDay({ year, month, day });

  if (!tablesData) redirect('/cuadrantes');

  return <TablesDetail {...{ tablesData, date: day_data }} />;
}
