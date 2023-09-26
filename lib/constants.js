export const apiBetsUrl = `${process.env.NEXT_PUBLIC_API_URL}apuestas/`;

export const sections = [
  {
    to: '/apuestas',
    copy: 'Gestión Apuestas'
  },
  {
    to: '/clientes',
    copy: 'Gestión Clientes'
  },
  {
    to: `/stats/${new Date().getFullYear()}`,
    copy: 'Estadísticas'
  },
  {
    to: '/perfil',
    copy: 'Mi Perfil'
  }
];

export const navbarPaths = [
  {
    to: '/apuestas',
    copy: 'Apuestas'
  },
  {
    to: '/clientes',
    copy: 'Clientes'
  },
  {
    to: `/stats/${new Date().getFullYear()}`,
    copy: 'Stats'
  },
  {
    to: '/perfil',
    copy: 'Perfil'
  },
  {
    to: '/',
    copy: 'Cerrar Sesión'
  }
];
