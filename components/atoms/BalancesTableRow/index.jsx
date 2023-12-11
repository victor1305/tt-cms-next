import Image from 'next/image';

import { bookiesImages } from '@/lib/constants';

const BalancesTableRow = ({ data }) => {
  const profitColor =
    data.profit < 0 ? '#f72c40' : data.profit > 0 ? '#03f73c' : '#2e63f7';
  return (
    <tr style={{ height: '36px' }}>
      <td>
        <Image
          style={{ paddingTop: '5px' }}
          src={bookiesImages[data._id]}
          width={90}
          height={25}
          alt="Logo"
        />
      </td>
      <td>{data.deposits}€</td>
      <td>{data.withdraws}€</td>
      <td style={{ color: profitColor, fontWeight: 'bold' }}>
        {data.profit.toFixed(2)}€
      </td>
    </tr>
  );
};

export default BalancesTableRow;
