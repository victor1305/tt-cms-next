import { headersClientsTable } from '@/lib/constants';
import { numberToMonth } from '@/lib/utils';

import { BalancesTable, ProfileBox } from '@/components/molecules';

import styles from './ClientDetail.module.scss';

const ClientDetail = ({ clientData }) => (
  <div className={styles['client-detail']}>
    <h1>Detalle de Cliente</h1>
    <div className={styles['client-detail__content']}>
      <ProfileBox text1="Historial de Pagos" text2="Detalle de Cliente">
        <div className={styles['client-detail__content__box']}>
          <BalancesTable
            headerArr={headersClientsTable}
            bodyArr={clientData.payments}
            isClientTable={true}
          />
          <div className={styles['client-detail__content__box--data']}>
            <p>
              Nombre: <span>{clientData.name}</span>
            </p>
            <p>
              Teléfono: <span>{clientData.phone}</span>
            </p>
            <p>
              Fecha de Registro:{' '}
              <span>
                {`${numberToMonth(
                  new Date(clientData.registerDate).getMonth()
                )}-${new Date(clientData.registerDate).getFullYear()}`}
              </span>
            </p>
            <p>
              Recomendado por:{' '}
              <span>{clientData.referred || 'Sin recomendación'}</span>
            </p>
          </div>
        </div>
      </ProfileBox>
    </div>
  </div>
);

export default ClientDetail;
