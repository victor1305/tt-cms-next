'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { DotLoader } from 'react-spinners';

import { getPaymentsListByMonth } from '@/lib/https';
import { getMonthFormatted, numberToMonth } from '@/lib/utils';

import { PaymentsTable } from '@/components/atoms';
import {
  BtnsBox,
  ClientModal,
  ConfirmModal,
  PaymentModal,
  ProfileBox
} from '@/components/molecules';

import styles from './Clients.module.scss';

const Clients = ({ token, payments, id, clients }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [isModalClientOpen, setIsModalClientOpen] = useState(false);
  const [isModalPaymentOpen, setIsModalPaymentOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  const [paymentToEdit, setPaymentToEdit] = useState({})
  const [paymentsList, setPaymentsList] = useState(payments);
  const [paymentToDelete, setPaymentToDelete] = useState({ id: '', name: '' });
  const [clientsList, setClientsList] = useState(clients);

  const year = startDate.getFullYear();
  const month = numberToMonth(startDate.getMonth());

  const isFirstRenderRef = useRef(true);

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

  const formSubmittedClient = () => {
    setIsModalClientOpen(false);
    reloadPayments();
  };

  const formSubmittedPayment = () => {
    setIsModalPaymentOpen(false);
    reloadPayments();
  };

  const editClient = (id) => {
    setIsEditModal(true);
    setPaymentToEdit(paymentsList.filter(elm => elm._id === id)[0]);
    setIsModalPaymentOpen(true);
    console.log('EDITO EL CLIENTE', id);
  };

  const deleteClient = () => {
    console.log('BORRO EL CLIENTE', paymentToDelete);
  };

  const handleClickDeleteClient = (id, name) => {
    setPaymentToDelete({
      id,
      name
    });
    setIsDeleteModalOpen(true);
  };

  const reloadPayments = useCallback(async () => {
    setIsLoading(true);
    const res = await getPaymentsListByMonth({
      year,
      month: getMonthFormatted(startDate.getMonth())
    });
    setPaymentsList(res.data);
    setIsLoading(false);
  }, [startDate, year]);

  useEffect(() => {
    if (!isFirstRenderRef.current) {
      reloadPayments();
    } else {
      isFirstRenderRef.current = false;
    }
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
              <PaymentsTable
                {...{
                  payments: paymentsList,
                  editClient,
                  deleteClient: handleClickDeleteClient
                }}
              />
            ) : (
              <p>No hay datos para este mes</p>
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
        principalBtn={deleteClient}
        secondaryBtn={() => setIsDeleteModalOpen(false)}
        principalBtnCopy={'Borrar'}
        secondaryBtnCopy={'Cancelar'}
      />
    </div>
  );
};

export default Clients;
