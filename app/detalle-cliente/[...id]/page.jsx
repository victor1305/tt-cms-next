import React from 'react';

import { getClientData } from '@/app/lib/https';

import { ClientDetail } from '@/components/organisms';

export default async function Page({ params }) {
  const [user_id] = params.id;

  const clientData = await getClientData({ id: user_id });
  return <ClientDetail {...{ clientData }} />;
}
