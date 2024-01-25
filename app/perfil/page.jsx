import React from 'react';

import { getUserData } from '@/app/api/user';
import { getPaymentsByUser } from '@/app/lib/https';

import { Profile } from '@/components/organisms';

export default async function Page() {
  const data = await getUserData();
  const id = data.data.id;
  const year = new Date().getFullYear();
  const monthNumber = new Date().getMonth();
  let monthFormated = monthNumber + 1;

  if (monthFormated < 10) monthFormated = `0${monthFormated}`;
  const userPays = await getPaymentsByUser({ id, year, monthFormated });
  const name = data.data.name;
  return <Profile {...{ userPays, name, id }} />;
}
