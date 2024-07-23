import React from 'react';

import { HorsesSearcher } from '@/components/organisms';

import { getUserData } from '../api/user';

export default async function Page() {
  const data = await getUserData();
  const token = data.data.token;
  return <HorsesSearcher {...{token}} />;
}
