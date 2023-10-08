import { redirect } from 'next/navigation';

import { getUserData } from '@/app/api/user';

import Login from '@/components/organisms/Login';

export default async function Page() {
  const data = await getUserData();

  if (data.status === 200) {
    redirect('/');
  }
  return <Login />;
}
