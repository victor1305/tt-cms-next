import jwtDecode from 'jwt-decode';
import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token');
  const url = request.nextUrl.clone();

  if (url.pathname.startsWith('/login')) {
    if (token) {
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  } else {
    if (token) {
      try {
        const tokenData = jwtDecode(token.value);
        if (tokenData.exp < Date.now() / 1000) {
          url.pathname = '/login';
          const response = NextResponse.redirect(url);
          response.cookies.delete('token');
          return response;
        }

        if (
          url.pathname.startsWith('/clientes') &&
          tokenData.role !== 'admin'
        ) {
          url.pathname = '/';
          return NextResponse.redirect(url);
        }
      } catch (error) {
        url.pathname = '/login';
        const response = NextResponse.redirect(url);
        response.cookies.delete('token');
        return response;
      }
    } else {
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
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
