'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import {
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import { Line } from 'react-chartjs-2';
import { DotLoader } from 'react-spinners';

import { chartMonths } from '@/lib/constants';
import {
  deletePayment,
  getClientsList,
  getPaymentsListByMonth,
  getPaymentsListByYear
} from '@/lib/https';
import { getMonthFormatted, numberToMonth } from '@/lib/utils';

import { PaymentsMonthResume, PaymentsTable } from '@/components/atoms';
import {
  BtnsBox,
  ClientModal,
  ConfirmModal,
  PaymentModal,
  ProfileBox
} from '@/components/molecules';

import styles from './Clients.module.scss';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

ChartJS.defaults.color = '#fff';
ChartJS.defaults.scale.grid.color = 'rgb(34, 37, 49)';

const Clients = ({ token, payments, id, clients, yearPayments }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [isModalClientOpen, setIsModalClientOpen] = useState(false);
  const [isModalPaymentOpen, setIsModalPaymentOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  const [paymentToEdit, setPaymentToEdit] = useState({});
  const [paymentsList, setPaymentsList] = useState(payments);
  const [paymentsListByYear, setPaymentsListByYear] = useState(yearPayments);
  const [paymentToDelete, setPaymentToDelete] = useState({ id: '', name: '' });
  const [clientsList, setClientsList] = useState(clients);
  const [chartData, setChartData] = useState({});
  const [chartPaymentsData, setChartPaymentsData] = useState({});

  const year = startDate.getFullYear();
  const month = numberToMonth(startDate.getMonth());

  const isFirstRenderRef = useRef(true);

  const totalPayments =
    paymentsList.length > 0 &&
    paymentsList.reduce((acc, elm) => {
      return acc + elm.price;
    }, 0);

  const paymentsAntonioArr =
    paymentsList.length > 0 &&
    paymentsList.filter((elm) => elm.beneficiary[0] === 'Antonio');
  const paymentsAntonio =
    paymentsAntonioArr.length > 0 &&
    paymentsAntonioArr.reduce((acc, elm) => {
      return acc + elm.price;
    }, 0);

  const paymentsEduArr =
    paymentsList.length > 0 &&
    paymentsList.filter((elm) => elm.beneficiary[0] === 'Eduardo');
  const paymentsEdu =
    paymentsEduArr.length > 0 &&
    paymentsEduArr.reduce((acc, elm) => {
      return acc + elm.price;
    }, 0);

  const paymentsVictorArr =
    paymentsList.length > 0 &&
    paymentsList.filter((elm) => elm.beneficiary[0] === 'Víctor');
  const paymentsVictor =
    paymentsVictorArr.length > 0 &&
    paymentsVictorArr.reduce((acc, elm) => {
      return acc + elm.price;
    }, 0);

  const btnsList = [
    {
      copy: 'Nuevo Cliente',
      handleClick: () => setIsModalClientOpen(true)
    },
    {
      copy: 'Añadir Pago',
      handleClick: () => {
        setIsEditModal(false), setIsModalPaymentOpen(true);
      }
    }
  ];

  const formSubmittedClient = async () => {
    setIsModalClientOpen(false);
    setIsLoading(true);
    const res = await getClientsList();
    setClientsList(res);
    setIsLoading(false);
  };

  const formSubmittedPayment = () => {
    setIsModalPaymentOpen(false);
    reloadPayments();
  };

  const editClientPayment = (id) => {
    setIsEditModal(true);
    setPaymentToEdit(paymentsList.filter((elm) => elm._id === id)[0]);
    setIsModalPaymentOpen(true);
  };

  const deleteClientPayment = async () => {
    setIsDeleteModalOpen(false);
    setIsLoading(true);
    await deletePayment({
      paymentId: paymentToDelete.id,
      clientId: paymentToDelete.clientId,
      beneficiaryId: paymentToDelete.beneficiary,
      token
    });
    reloadPayments();
  };

  const handleClickDeleteClient = (id, name, beneficiary, clientId) => {
    setPaymentToDelete({
      id,
      name,
      beneficiary: beneficiary,
      clientId
    });
    setIsDeleteModalOpen(true);
  };

  const calculateDataForMonth = (paymentsByYear, year, month) => {
    const startOfMonth = new Date(
      `${year}-${month > 9 ? month : `0${month}`}-01T00:00:00.000Z`
    );
    const endOfMonth = new Date(
      `${month > 11 ? year + 1 : year}-${
        month + 1 > 9 && month < 12
          ? month + 1
          : month > 11
          ? '01'
          : `0${month + 1}`
      }-01T00:00:00.000Z`
    );

    const clientsCount = paymentsByYear.filter(
      (elm) =>
        elm.date >= startOfMonth.toISOString() &&
        elm.date < endOfMonth.toISOString() &&
        elm.price >= 0
    ).length;

    const paymentsTotal = paymentsByYear
      .filter(
        (elm) =>
          elm.date >= startOfMonth.toISOString() &&
          elm.date < endOfMonth.toISOString()
      )
      .reduce((acc, elm) => acc + elm.price, 0);

    return { clientsCount, paymentsTotal };
  };

  const formatChartInfo = useCallback((paymentByYear) => {
    const listClientsChart = [];
    const listPaymentsChart = [];
    chartMonths.forEach((month, index) => {
      const { clientsCount, paymentsTotal } = calculateDataForMonth(
        paymentByYear,
        year,
        index + 1
      );
      listClientsChart.push(clientsCount);
      listPaymentsChart.push(paymentsTotal);
    });

    // Lógica especial para el año 2021
    if (year === 2021) {
      listClientsChart[0] = 57;
      listPaymentsChart[0] = 0;
      listClientsChart[1] = 57;
      listPaymentsChart[1] = 0;
      listClientsChart[2] = 48;
      listPaymentsChart[2] = 0;
      listClientsChart[3] = 48;
      listPaymentsChart[3] = 0;
      listClientsChart[4] = 44;
      listPaymentsChart[4] = 0;
    }

    setChartData({
      labels: chartMonths,
      datasets: [
        {
          label: 'Número Clientes',
          data: listClientsChart,
          backgroundColor: '#fff',
          borderColor: '#3860fb',
          borderWidth: 2
        }
      ]
    });

    setChartPaymentsData({
      labels: chartMonths,
      datasets: [
        {
          label: 'Ingresos Mensuales',
          data: listPaymentsChart,
          backgroundColor: '#fff',
          borderColor: '#3860fb',
          borderWidth: 2
        }
      ]
    });
  }, [year]);

  const reloadPayments = useCallback(async () => {
    setIsLoading(true);
    const res = await getPaymentsListByMonth({
      year,
      month: getMonthFormatted(startDate.getMonth())
    });
    const resYear = await getPaymentsListByYear({ year });
    setPaymentsList(res.data);
    setPaymentsListByYear(resYear.data);
    formatChartInfo(resYear.data);
    setIsLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, year]);

  useEffect(() => {
    if (!isFirstRenderRef.current) {
      reloadPayments();
    } else {
      isFirstRenderRef.current = false;
      formatChartInfo(paymentsListByYear);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, reloadPayments]);

  return (
    <div className={styles['clients']}>
      <h1>Administración Clientes</h1>
      <BtnsBox {...{ btnsList, justify: 'space-around', width: '900px' }} />
      {isLoading ? (
        <div className="spinner-container">
          <DotLoader color={'#3860fb'} loading={isLoading} size={90} />
        </div>
      ) : (
        <div className={styles['clients__content']}>
          <ProfileBox
            text1={`Estado pagos ${month} ${year}`}
            text2="Selecciona otro mes:"
            startDate={startDate}
            setStartDate={setStartDate}
          >
            {paymentsList.length ? (
              <div className={styles['clients__content--data']}>
                <PaymentsTable
                  {...{
                    payments: paymentsList,
                    editClient: editClientPayment,
                    deleteClient: handleClickDeleteClient
                  }}
                />
                <div className={styles['clients__content--charts']}>
                  <PaymentsMonthResume
                    {...{
                      totalPayments,
                      year,
                      month,
                      paymentsAntonio,
                      paymentsEdu,
                      paymentsVictor
                    }}
                  />
                  {chartData.datasets && (
                    <div className={styles['clients__content--chart']}>
                      <p>Resúmen Clientes Año</p>
                      <Line data={chartData} />
                    </div>
                  )}
                  {chartPaymentsData.datasets && (
                    <div className={styles['clients__content--chart']}>
                      <p>Resúmen Ingresos Año</p>
                      <Line data={chartPaymentsData} />
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <p className={styles['clients__content--no-pays']}>
                No hay datos para este mes
              </p>
            )}
          </ProfileBox>
        </div>
      )}
      <ClientModal
        handleClose={() => setIsModalClientOpen(false)}
        show={isModalClientOpen}
        token={token}
        formSubmitted={formSubmittedClient}
      />
      <PaymentModal
        clientsList={clientsList}
        handleClose={() => setIsModalPaymentOpen(false)}
        show={isModalPaymentOpen}
        token={token}
        isEdit={isEditModal}
        id={id}
        formData={paymentToEdit}
        formSubmitted={formSubmittedPayment}
        resetPayment={setPaymentToEdit}
      />
      <ConfirmModal
        text={`¿Estás seguro de borrar el pago de ${paymentToDelete.name}?`}
        handleClose={() => setIsDeleteModalOpen(false)}
        show={isDeleteModalOpen}
        hasXToClose={true}
        principalBtn={deleteClientPayment}
        secondaryBtn={() => setIsDeleteModalOpen(false)}
        principalBtnCopy={'Borrar'}
        secondaryBtnCopy={'Cancelar'}
      />
    </div>
  );
};

export default Clients;
