import jwtDecode from 'jwt-decode';
import { NextResponse } from 'next/server';

export function middleware(request) {
  // const returnProps = {
  //   props: {
  //     isLoggedIn: false
  //   }
  // };
  // console.log('ENTRA')
  // if (request.cookies && request.cookies.get('token')?.value) {
  //   const tokenData = jwtDecode(request.cookies.get('token')?.value);
  //   console.log(tokenData)
  //   if (tokenData) {
  //     returnProps.props.userData = tokenData;
  //     returnProps.props.isLoggedIn = true;
  //   }

  //   const now = Date.now().valueOf() / 1000;
  //   if (tokenData.exp < now) {
  //     returnProps.props.isLoggedIn = false;
  //   }
  // }

  // if (
  //   !returnProps.props.isLoggedIn &&
  //   !request.nextUrl.pathname.startsWith('/login')
  // ) {
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/apuestas',
    '/apuestas/(.*)',
    '/clientes',
    '/clientes/(.*)',
    '/detalle-apuesta',
    '/detalle-apuesta/(.*)',
    '/detalle-cliente',
    '/detalle-cliente/(.*)',
    '/detalle-dia',
    '/detalle-dia/(.*)',
    '/perfil',
    '/perfil/(.*)',
    '/stats',
    '/stats/(.*)'
  ]
};
