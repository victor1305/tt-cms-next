import jwtDecode from 'jwt-decode';
import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token');
  const url = request.nextUrl.clone();

  if (url.pathname.startsWith('/login')) {
    // Si está intentando acceder a login pero ya tiene un token válido, redirigir a home.
    if (token) {
      try {
        const tokenData = jwtDecode(token.value);
        if (tokenData.exp > Date.now() / 1000) {
          if (url.pathname === '/login') {
            // Verificar si realmente estamos en /login.
            url.pathname = '/'; // Cambia la ruta a home.
            return NextResponse.redirect(url);
          }
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  } else {
    // Si intenta acceder a cualquier otra página y no está logueado, redirigir a login.
    if (!token) {
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
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
