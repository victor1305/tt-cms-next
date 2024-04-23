import React from 'react';

import { sections } from '@/lib/constants';

import { getUserData } from '@/app/api/user';

import { Principal } from '@/components/organisms';

export default async function Home() {
  const user = await getUserData();
  let menu = sections;

  if (user.data.role !== 'admin') {
    menu = menu.filter((elm) => !elm.to.toLowerCase().includes('client'));
  }
  return <Principal {...{ menu }} />;
}
