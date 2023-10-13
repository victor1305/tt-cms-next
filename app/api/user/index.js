import jwtDecode from 'jwt-decode';
import { cookies } from 'next/headers';

export const getUserData = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;
  const response = {
    data: {},
    status: 403
  };
  if (token) {
    const tokenData = jwtDecode(cookieStore.get('token')?.value);
    if (tokenData) {
      response.status = 200;
      response.data = tokenData;
      response.data.token = cookieStore.get('token')?.value;
    }
  }
  return response;
};
