import React from 'react';

import { getMonthFormatted } from '@/lib/utils';

import { getUserData } from '@/app/api/user';
import { getPaymentsListByMonth, getClientsList } from '@/app/lib/https';

import { Clients } from '@/components/organisms';

export default async function Page() {
  const data = await getUserData();
  const id = data.data.id;
  const token = data.data.token;

  const year = new Date().getFullYear();
  const month = new Date().getMonth();
  const monthFormated = getMonthFormatted(month);

  const payments = await getPaymentsListByMonth({ year, month: monthFormated });
  const clients = await getClientsList();

  return <Clients {...{ token, id, payments: payments, clients }} />;
}
