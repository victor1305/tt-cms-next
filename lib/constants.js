export const apiBetsUrl = `${process.env.NEXT_PUBLIC_API_URL}apuestas/`;
export const apiClientsUrl = `${process.env.NEXT_PUBLIC_API_URL}clientes/`;
export const apiUsersUrl = process.env.NEXT_PUBLIC_API_URL;

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
    to: '/mis-apuestas',
    copy: 'Mis Apuestas'
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
    to: '/mis-apuestas',
    copy: 'Mis Apuestas'
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

export const paymentTypes = [
  'Bizum',
  'Paypal',
  'Paysafecard',
  'Efectivo',
  'Transferencia'
];

export const paymentsProfileHeaders = [
  '#',
  'Cliente',
  'Estado',
  'Método',
  'Cantidad',
  'Notas'
];

export const weekDays = [
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
  'Domingo'
];

export const dayPlannerMapping = {
  1: 1,
  2: 0,
  3: -1,
  4: -2,
  5: -3,
  6: -4,
  0: -5
};

export const bookiesNames = [
  'Bet365',
  'Betbird',
  'Betfair',
  'Kirolbet',
  'Sportium',
  'William Hill',
  'Zeturf'
];

export const headersBalanceTable = [
  'Bookie',
  'Depósitos',
  'Reintegros',
  'Profit'
];

export const headersClientsTable = [
  '#',
  'Fecha',
  'Cantidad',
  'Método',
  'Estado',
  'Recibe',
  'Notas'
];

export const bookiesImages = {
  Bet365: '/bet365.svg',
  Betbird: '/betbird.svg',
  Betfair: '/betfair.svg',
  Kirolbet: '/kirolbet.svg',
  Sportium: '/sportium.svg',
  WilliamHill: '/william-hill.svg'
};

export const defaultPersonalBetForm = {
  bookie: '',
  initialBalance: 0,
  deposits: 0,
  withdraws: 0,
  finalBalance: 0,
  date: new Date()
};
