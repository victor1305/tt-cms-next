import jwtDecode from 'jwt-decode';
import { NextResponse } from 'next/server';

export function middleware(request) {
  const returnProps = {
    props: {
      isLoggedIn: false
    }
  };
  if (request.cookies && request.cookies.get('token')?.value) {
    const tokenData = jwtDecode(request.cookies.get('token')?.value);

    if (tokenData) {
      returnProps.props.userData = tokenData;
      returnProps.props.isLoggedIn = true;
    }
  }

  if (
    !returnProps.props.isLoggedIn &&
    !request.nextUrl.pathname.startsWith('/login')
  ) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
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
