import jwtDecode from 'jwt-decode';
import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token');
  const url = request.nextUrl.clone();

  if (url.pathname.startsWith('/login')) {
    if (token) {
      try {
        const tokenData = jwtDecode(token.value);
        if (tokenData.exp < Date.now() / 1000) {
          // Token caducado, borra el token y sigue en login.
          const response = NextResponse.redirect(url);
          response.cookies.delete('token'); // Borra el token caducado.
          return response;
        } else if (url.pathname === '/login') {
          // Token válido, redirige a home.
          url.pathname = '/';
          return NextResponse.redirect(url);
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        // En caso de error en la decodificación, considera borrar el token también.
        const response = NextResponse.redirect(url);
        response.cookies.delete('token'); // Borra el token potencialmente inválido.
        return response;
      }
    }
  } else {
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
    '/login', // Asegúrate de incluir login en el matcher.
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
