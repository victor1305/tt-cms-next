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

export const paymentsHeaders = [
  '#',
  'Cliente',
  'Estado',
  'Método',
  'Cantidad',
  'Recibe',
  'Notas',
  '',
  ''
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
  'Codere',
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
  Bet365: '/bet365.png',
  Betbird: '/betbird.png',
  Betfair: '/betfair.png',
  Codere: '/codere.png',
  Kirolbet: '/kirolbet.png',
  Sportium: '/sportium.png',
  "William Hill": '/william-hill.png',
  Zeturf: '/zeturf.png',
};

export const defaultPersonalBetForm = {
  bookie: 'Bet365',
  initialBalance: 0,
  deposits: 0,
  withdraws: 0,
  finalBalance: 0,
  date: new Date()
};

export const defaultClientForm = {
  name: '',
  phoneNumber: 0,
  registerDate: new Date(),
  referred: ''
};

export const defaultPaymentForm = {
  client: '',
  date: new Date(),
  status: 'Pendiente',
  price: 40,
  type: '',
  beneficiary: '',
  beneficiaryId: [],
  information: ''
};

export const statusPayments = ['Pendiente', 'Pagado', 'Impago'];

export const beneficiarysList = [
  {
    _id: '60c78b7b0d2c7d19af2e6591',
    name: 'Edu'
  },
  {
    _id: '5fc8d746cd27b1586f3806f8',
    name: 'Víctor'
  },
  {
    _id: '60c78af70d2c7d19af2e6590',
    name: 'Antonio'
  }
];

export const chartMonths = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
