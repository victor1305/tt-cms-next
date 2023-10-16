import { numberToMonth } from '@/lib/utils';

const ClientTableRow = ({ data, index }) => {
  const user =
    data.beneficiary === '60c78b7b0d2c7d19af2e6591'
      ? 'Edu'
      : data.beneficiary === '60c78af70d2c7d19af2e6590'
      ? 'Antonio'
      : 'Víctor';

  const paymentColor =
    data.status === 'Pagado'
      ? '#03f73c'
      : data.status === 'Pendiente'
      ? '#2e63f7'
      : '#f72c40';

  return (
    <tr>
      <td>{index + 1}</td>
      <td style={{ textAlign: 'left' }}>{`${numberToMonth(
        new Date(data.date).getMonth()
      )}-${new Date(data.date).getFullYear()}`}</td>
      <td>{data.price}€</td>
      <td>{data.type}</td>
      <td>
        <span
          style={{
            background: paymentColor,
            width: '50px',
            height: '10px',
            borderRadius: '5px',
            margin: '0 auto',
            display: 'block'
          }}
        />
      </td>
      <td>{user}</td>
      <td>{data.information}</td>
    </tr>
  );
};

export default ClientTableRow;
